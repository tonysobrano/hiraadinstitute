import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { SingleEventPageContent } from "@/components/pages/SingleEventPageContent";
import { getContentResolver } from "@/lib/site/content";
import { getEventsContent, getEventSlugs } from "@/lib/site/events";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const resolveEvent = cache(async (slug: string) => {
  const events = await getEventsContent();
  const event = events.find((item) => item.slug === slug);

  if (!event) return null;

  const eventMap = new Map(events.map((item) => [item.slug, item]));
  const relatedFromReferences = event.relatedEventSlugs
    .map((relatedSlug) => eventMap.get(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 3);

  const fallbackRelated = events.filter((item) => item.slug !== slug).slice(0, 3);

  return {
    event,
    relatedEvents: relatedFromReferences.length ? relatedFromReferences : fallbackRelated
  };
});

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveEvent(slug);

  if (!resolved) {
    return {
      title: "Event | Hiraad Institute"
    };
  }

  return {
    title: `${resolved.event.title} | Hiraad Institute`,
    description: resolved.event.previewDescription
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const resolved = await resolveEvent(slug);
  if (!resolved) {
    notFound();
  }

  const c = await getContentResolver("single-event");
  return <SingleEventPageContent c={c} event={resolved.event} relatedEvents={resolved.relatedEvents} />;
}
