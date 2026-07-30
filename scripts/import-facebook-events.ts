import "dotenv/config";

import { createClient } from "@sanity/client";
import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

type StagedEvent = {
  _type: "event";
  title: string;
  slug: { current: string };
  date: string;
  endDate?: string | null;
  location?: string | null;
  excerpt: string;
  highlight?: string | null;
  author?: string | null;
  category?: string | null;
  sourceUrl?: string;
};

type ExistingEvent = {
  _id: string;
  mainAssetRef?: string;
  galleryAssetRefs?: string[];
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

const root = process.cwd();
const stagedEventsPath = join(root, "content", "hiraad-facebook-events.json");
const imageRoot = join(root, "public", "images", "events", "facebook");

function imageBlock(assetRef: string, alt: string, key?: string) {
  return {
    ...(key ? { _key: key } : {}),
    _type: "image",
    alt,
    asset: {
      _type: "reference",
      _ref: assetRef
    }
  };
}

function portableText(text: string) {
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
          text,
          marks: []
        }
      ]
    }
  ];
}

async function existingEvent(slug: string): Promise<ExistingEvent | null> {
  return client.fetch<ExistingEvent | null>(
    `*[_type == "event" && slug.current == $slug][0]{_id, "mainAssetRef": mainImage.asset._ref, "galleryAssetRefs": galleryImages[].asset._ref}`,
    { slug }
  );
}

async function uploadImages(slug: string, title: string): Promise<string[]> {
  const eventDir = join(imageRoot, slug);
  let imageFiles: string[];
  try {
    imageFiles = (await readdir(eventDir))
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .sort();
  } catch {
    console.warn(`No local image directory found for ${slug}.`);
    return [];
  }

  const refs: string[] = [];
  for (const imageFile of imageFiles) {
    const filePath = join(eventDir, imageFile);
    const buffer = await readFile(filePath);
    const extension = extname(imageFile).toLowerCase().replace(".", "") || "jpg";
    const uploaded = await client.assets.upload("image", buffer, {
      filename: `${slug}-${basename(imageFile, extname(imageFile))}.${extension}`,
      contentType: extension === "jpg" ? "image/jpeg" : `image/${extension}`
    });
    refs.push(uploaded._id);
    console.log(`Uploaded image: ${title} / ${imageFile}`);
  }

  return refs;
}

async function importEvent(event: StagedEvent) {
  const slug = event.slug.current;
  const existing = await existingEvent(slug);
  let assetRefs = existing?.galleryAssetRefs?.length ? existing.galleryAssetRefs : [];

  if (!assetRefs.length) {
    assetRefs = await uploadImages(slug, event.title);
  }

  if (!assetRefs.length) {
    console.warn(`Skipped ${slug}: no local image assets were found.`);
    return false;
  }

  const mainAssetRef = existing?.mainAssetRef ?? assetRefs[0];
  const galleryImages = assetRefs.map((assetRef, index) =>
    imageBlock(assetRef, `${event.title} image ${index + 1}`, `gallery-${index + 1}`)
  );

  await client.createOrReplace({
    _id: existing?._id ?? `event.${slug}`,
    _type: "event",
    title: event.title,
    slug: event.slug,
    date: event.date,
    location: event.location ?? undefined,
    excerpt: event.excerpt,
    highlight: event.highlight ?? undefined,
    author: event.author ?? "Hiraad Institute",
    category: event.category ?? "Institutional Event",
    mainImage: imageBlock(mainAssetRef, `${event.title} preview`),
    galleryImages,
    body: portableText(event.excerpt)
  });

  console.log(`Published event: ${slug}`);
  return true;
}

async function run() {
  const events = JSON.parse(await readFile(stagedEventsPath, "utf8")) as StagedEvent[];
  let published = 0;
  let skipped = 0;

  for (const event of events) {
    if (await importEvent(event)) published += 1;
    else skipped += 1;
  }

  console.log(`Done. Published ${published} event(s); skipped ${skipped}.`);
}

run().catch((error) => {
  console.error("Failed to publish Facebook events:", error);
  process.exit(1);
});
