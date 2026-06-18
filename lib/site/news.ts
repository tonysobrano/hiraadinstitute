import { sanityClient, sanityEnabled } from "@/lib/sanity/client";
import { NEWS_BY_SLUG_QUERY, NEWS_QUERY, NEWS_SLUGS_QUERY } from "@/lib/sanity/queries";

interface SlugRow {
  slug?: string;
}

interface SanityRelatedNews {
  slug?: string;
  meta?: string;
  title?: string;
}

interface SanityNewsListRow {
  slug?: string;
  meta?: string;
  title?: string;
  image?: string;
  description?: string;
}

interface SanityNewsRow extends SanityNewsListRow {
  breadcrumb?: string;
  metaLine?: string;
  introTitle?: string;
  introText?: string;
  detailsTitle?: string;
  author?: string;
  location?: string;
  source?: string;
  blockOneTitle?: string;
  blockOneText?: string;
  blockTwoTitle?: string;
  blockTwoText?: string;
  assetTitle?: string;
  assetText?: string;
  assetPrimaryLabel?: string;
  assetPrimaryHref?: string;
  assetSecondaryLabel?: string;
  assetSecondaryHref?: string;
  relatedNews?: SanityRelatedNews[];
}

export interface NewsListItem {
  slug: string;
  meta: string;
  title: string;
  image: string;
  description: string;
}

export interface RelatedNewsItem {
  slug: string;
  meta: string;
  title: string;
}

export interface NewsContent extends NewsListItem {
  breadcrumb: string;
  metaLine: string;
  introTitle: string;
  introText: string;
  detailsTitle: string;
  author: string;
  location: string;
  source: string;
  blockOneTitle: string;
  blockOneText: string;
  blockTwoTitle: string;
  blockTwoText: string;
  assetTitle: string;
  assetText: string;
  assetPrimaryLabel: string;
  assetPrimaryHref: string;
  assetSecondaryLabel: string;
  assetSecondaryHref: string;
  relatedNews: RelatedNewsItem[];
}

function clean(value?: string): string {
  return value?.trim() ?? "";
}

function normalizeNewsListItem(row: SanityNewsListRow | null): NewsListItem | null {
  if (!row) return null;

  const slug = clean(row.slug);
  if (!slug) return null;

  return {
    slug,
    meta: clean(row.meta),
    title: clean(row.title) || "Untitled Story",
    image: clean(row.image),
    description: clean(row.description)
  };
}

function normalizeRelatedNews(row: SanityRelatedNews | null): RelatedNewsItem | null {
  if (!row) return null;
  const slug = clean(row.slug);
  if (!slug) return null;

  return {
    slug,
    meta: clean(row.meta),
    title: clean(row.title) || "Untitled Story"
  };
}

function normalizeNews(row: SanityNewsRow | null): NewsContent | null {
  const base = normalizeNewsListItem(row);
  if (!row || !base) return null;

  return {
    ...base,
    breadcrumb: clean(row.breadcrumb),
    metaLine: clean(row.metaLine),
    introTitle: clean(row.introTitle),
    introText: clean(row.introText),
    detailsTitle: clean(row.detailsTitle),
    author: clean(row.author),
    location: clean(row.location),
    source: clean(row.source),
    blockOneTitle: clean(row.blockOneTitle),
    blockOneText: clean(row.blockOneText),
    blockTwoTitle: clean(row.blockTwoTitle),
    blockTwoText: clean(row.blockTwoText),
    assetTitle: clean(row.assetTitle),
    assetText: clean(row.assetText),
    assetPrimaryLabel: clean(row.assetPrimaryLabel),
    assetPrimaryHref: clean(row.assetPrimaryHref),
    assetSecondaryLabel: clean(row.assetSecondaryLabel),
    assetSecondaryHref: clean(row.assetSecondaryHref),
    relatedNews: (row.relatedNews ?? [])
      .map((item) => normalizeRelatedNews(item))
      .filter((item): item is RelatedNewsItem => Boolean(item))
  };
}

export async function getNewsContent(): Promise<NewsListItem[]> {
  if (!sanityEnabled || !sanityClient) {
    return [];
  }

  const rows = await sanityClient.fetch<SanityNewsListRow[]>(NEWS_QUERY, {}, { next: { revalidate: 30 } });
  return rows.map((row) => normalizeNewsListItem(row)).filter((row): row is NewsListItem => Boolean(row));
}

export async function getNewsBySlug(slug: string): Promise<NewsContent | null> {
  if (!sanityEnabled || !sanityClient) {
    return null;
  }

  const row = await sanityClient.fetch<SanityNewsRow | null>(
    NEWS_BY_SLUG_QUERY,
    { slug },
    { next: { revalidate: 30 } }
  );
  return normalizeNews(row);
}

export async function getNewsSlugs(): Promise<string[]> {
  if (!sanityEnabled || !sanityClient) {
    return [];
  }

  const rows = await sanityClient.fetch<SlugRow[]>(NEWS_SLUGS_QUERY, {}, { next: { revalidate: 30 } });
  return rows.map((row) => clean(row.slug)).filter(Boolean);
}
