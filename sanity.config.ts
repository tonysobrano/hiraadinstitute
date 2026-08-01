"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "@/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "jn5vyvdg";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "default",
  title: "Hiraad Studio",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Hiraad Studio")
          .items([
            S.documentTypeListItem("publication").title("Publications"),
            S.documentTypeListItem("news").title("News"),
            S.documentTypeListItem("event").title("Events"),
            S.divider(),
            S.documentTypeListItem("researchSubmission").title("Research Submissions"),
            S.documentTypeListItem("contactSubmission").title("Contact Submissions"),
            S.documentTypeListItem("newsletterSubscriber").title("Newsletter Subscribers")
          ])
    })
  ],
  schema: {
    types: schemaTypes
  }
});
