import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SingleNewsPageContent } from "@/components/pages/SingleNewsPageContent";
import { getContentResolver } from "@/lib/site/content";
import { getNewsBySlug, getNewsContent, getNewsSlugs } from "@/lib/site/news";

interface NewsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function resolveNews(slug: string) {
  const [news, newsItems] = await Promise.all([getNewsBySlug(slug), getNewsContent()]);
  if (!news) return null;

  const newsMap = new Map(newsItems.map((item) => [item.slug, item]));
  const relatedFromReferences = news.relatedNews
    .map((relatedItem) => newsMap.get(relatedItem.slug) ?? relatedItem)
    .slice(0, 3);

  const fallbackRelated = newsItems.filter((item) => item.slug !== slug).slice(0, 3);

  return {
    news,
    relatedNews: relatedFromReferences.length ? relatedFromReferences : fallbackRelated
  };
}

const fallbackMetadata: Metadata = {
  title: "News Story | Hiraad Institute",
  description: "Detailed news story page with story context, highlights, next steps, and media assets."
};

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveNews(slug);

  if (!resolved) {
    return fallbackMetadata;
  }

  return {
    title: `${resolved.news.title} | Hiraad Institute`,
    description: resolved.news.description
  };
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const resolved = await resolveNews(slug);
  if (!resolved) {
    notFound();
  }

  const c = await getContentResolver("single-news");
  return <SingleNewsPageContent c={c} news={resolved.news} relatedNews={resolved.relatedNews} />;
}
