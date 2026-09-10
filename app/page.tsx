import type { Metadata } from "next";

import { HomePageContent } from "@/components/pages/HomePageContent";
import { getContentResolver } from "@/lib/site/content";
import { getEventsContent } from "@/lib/site/events";
import { getNewsContent } from "@/lib/site/news";

export const metadata: Metadata = {
  title: "Hiraad Institute | Evidence-Based Somali Policy Research",
  description:
    "Hiraad Institute is an independent, non-partisan public policy research institute based in Jigjiga, Somali Region, Ethiopia."
};

export default async function HomePage() {
  const [c, newsItems, events] = await Promise.all([
    getContentResolver("home"),
    getNewsContent(),
    getEventsContent()
  ]);
  return <HomePageContent c={c} newsItems={newsItems} events={events} />;
}
