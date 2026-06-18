import "dotenv/config";
import { createClient } from "@sanity/client";

interface HomeNewsItem {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  imageUrl?: string;
  sourceUrl: string;
}

const HOMEPAGE_URL = "https://hiraadinstitute.com/";
const API_BASE = "https://hiraadinstitute.com/wp-json/wp/v2";
const LIMIT = 3;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

if (!projectId || !token) {
  console.error(
    "Missing required env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function slugFromUrl(url: string): string {
  const parsed = new URL(url);
  const segments = parsed.pathname.split("/").filter(Boolean);
  return segments.at(-1) ?? "";
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; hiraad-news-sync/1.0)"
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }

  return (await response.json()) as T;
}

function extractHomepagePostLinks(homepageHtml: string): string[] {
  const linkRegex = /href=["'](https?:\/\/hiraadinstitute\.com\/[0-9]{4}\/[0-9]{2}\/[^"'#?\s]+\/?)["']/gi;
  const links = new Set<string>();

  for (const match of homepageHtml.matchAll(linkRegex)) {
    links.add(match[1]);
  }

  return [...links].slice(0, LIMIT);
}

async function uploadMainImage(imageUrl?: string, title?: string) {
  if (!imageUrl) return undefined;

  try {
    const response = await fetch(imageUrl, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; hiraad-news-sync/1.0)"
      }
    });

    if (!response.ok) {
      throw new Error(`Image download failed: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") ?? "image/jpeg";
    const extension = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
    const buffer = Buffer.from(await response.arrayBuffer());

    const uploaded = await client.assets.upload("image", buffer, {
      filename: `${(title ?? "news-image").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.${extension}`,
      contentType
    });

    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: uploaded._id
      }
    };
  } catch (error) {
    console.warn(`Skipping image upload for ${imageUrl}:`, error);
    return undefined;
  }
}

function toPortableTextBlocks(text: string) {
  const cleaned = stripHtml(text);
  return [
    {
      _type: "block",
      _key: "summary",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "summary-span",
          text: cleaned,
          marks: []
        }
      ]
    }
  ];
}

async function scrapeHomepageNews(): Promise<HomeNewsItem[]> {
  const homepageHtml = await fetch(HOMEPAGE_URL, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; hiraad-news-sync/1.0)"
    }
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Homepage request failed (${response.status})`);
    }

    return await response.text();
  });

  const postLinks = extractHomepagePostLinks(homepageHtml);
  if (!postLinks.length) {
    throw new Error("Could not find homepage news post links.");
  }

  type WpPost = {
    date_gmt?: string;
    date?: string;
    slug?: string;
    link?: string;
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
    yoast_head_json?: { og_image?: Array<{ url?: string }> };
    _embedded?: {
      ["wp:featuredmedia"]?: Array<{ source_url?: string }>;
    };
  };

  const newsItems: HomeNewsItem[] = [];

  for (const link of postLinks.slice(0, LIMIT)) {
    const slug = slugFromUrl(link);
    if (!slug) continue;

    const posts = await fetchJson<WpPost[]>(`${API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed`);
    const post = posts[0];
    if (!post?.slug || !post?.title?.rendered) continue;

    const excerpt = stripHtml(post.excerpt?.rendered ?? "");
    const imageUrl =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
      post.yoast_head_json?.og_image?.[0]?.url;

    newsItems.push({
      title: stripHtml(post.title.rendered),
      slug: post.slug,
      excerpt,
      publishedAt: post.date_gmt ?? post.date ?? new Date().toISOString(),
      imageUrl,
      sourceUrl: post.link ?? link
    });
  }

  return newsItems.slice(0, LIMIT);
}

async function upsertNewsItem(item: HomeNewsItem) {
  const docId = `news.${item.slug}`;
  const image = await uploadMainImage(item.imageUrl, item.title);

  await client.createOrReplace({
    _id: docId,
    _type: "news",
    title: item.title,
    slug: {
      _type: "slug",
      current: item.slug
    },
    publishedAt: item.publishedAt,
    excerpt: item.excerpt,
    body: toPortableTextBlocks(item.excerpt),
    source: item.sourceUrl,
    ...(image ? { mainImage: image } : {})
  });

  console.log(`Upserted news: ${item.slug}`);
}

async function run() {
  const items = await scrapeHomepageNews();

  if (items.length < LIMIT) {
    throw new Error(`Expected ${LIMIT} homepage news items but found ${items.length}.`);
  }

  for (const item of items) {
    await upsertNewsItem(item);
  }

  console.log(`Done. Imported ${items.length} homepage news items into Sanity.`);
}

run().catch((error) => {
  console.error("Failed to import homepage news:", error);
  process.exit(1);
});
