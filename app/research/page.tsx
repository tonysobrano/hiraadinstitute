import type { Metadata } from "next";

import { ResearchPageContent } from "@/components/pages/ResearchPageContent";
import { getContentResolver } from "@/lib/site/content";
import { journals } from "@/lib/site/journals";

export const metadata: Metadata = {
  title: "Research | Hiraad Institute",
  description:
    "Explore Hiraad Institute's thematic research areas, advisory services, dialogue platforms, and policy impact cycle."
};

export default async function ResearchPage() {
  const c = await getContentResolver("research");
  return <ResearchPageContent c={c} journals={journals} />;
}
