import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SinglePublicationPageContent } from "@/components/pages/SinglePublicationPageContent";
import { getContentResolver } from "@/lib/site/content";
import { getPublicationBySlug, getPublicationsContent, getPublicationSlugs } from "@/lib/site/publications";

interface PublicationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function resolvePublication(slug: string) {
  const [publication, publications] = await Promise.all([getPublicationBySlug(slug), getPublicationsContent()]);
  if (!publication) return null;

  const publicationMap = new Map(publications.map((item) => [item.slug, item]));
  const relatedFromReferences = publication.relatedPublications
    .map((relatedPublication) => publicationMap.get(relatedPublication.slug) ?? relatedPublication)
    .slice(0, 3);

  const fallbackRelated = publications.filter((item) => item.slug !== slug).slice(0, 3);

  return {
    publication,
    relatedPublications: relatedFromReferences.length ? relatedFromReferences : fallbackRelated
  };
}

const fallbackMetadata: Metadata = {
  title: "Publication | Hiraad Institute",
  description: "Detailed publication page with abstract, citation details, key findings, recommendations, and downloads."
};

export async function generateStaticParams() {
  const slugs = await getPublicationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolvePublication(slug);

  if (!resolved) {
    return fallbackMetadata;
  }

  return {
    title: `${resolved.publication.title} | Hiraad Institute`,
    description: resolved.publication.description
  };
}

export default async function PublicationDetailPage({ params }: PublicationPageProps) {
  const { slug } = await params;
  const resolved = await resolvePublication(slug);
  if (!resolved) {
    notFound();
  }

  const c = await getContentResolver("single-publication");
  return (
    <SinglePublicationPageContent
      c={c}
      publication={resolved.publication}
      relatedPublications={resolved.relatedPublications}
    />
  );
}
