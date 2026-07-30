import type { Metadata } from "next";

import { JournalsPageContent } from "@/components/pages/JournalsPageContent";
import { getContentResolver } from "@/lib/site/content";
import { journals } from "@/lib/site/journals";

export const metadata: Metadata = {
  title: "Journals | Hiraad Institute",
  description: "Read and download Hiraad Institute research papers and policy briefs."
};

export default async function JournalsPage() {
  const c = await getContentResolver("publications");
  return <JournalsPageContent c={c} journals={journals} />;
}
