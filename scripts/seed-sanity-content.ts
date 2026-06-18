import "dotenv/config";
import { createClient } from "@sanity/client";

import { PAGE_SLUGS, type PageSlug } from "@/lib/site/types";

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

const titleMap: Record<PageSlug, string> = {
  home: "Home",
  about: "About",
  research: "Research",
  publications: "Publications",
  events: "Events",
  contact: "Contact",
  "news-media": "News & Media",
  "single-publication": "Single Publication",
  "single-news": "Single News",
  "single-event": "Single Event"
};

async function run() {
  for (const slug of PAGE_SLUGS) {
    await client.createOrReplace({
      _id: `pageContent.${slug}`,
      _type: "pageContent",
      title: titleMap[slug],
      slug,
      textOverrides: [],
      imageOverrides: [],
      eventImageSets: []
    });

    console.log(`Seeded ${slug}`);
  }

  console.log("Sanity page-content seed complete.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
