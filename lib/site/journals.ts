export type JournalKind = "Policy Brief" | "Research Paper";

export interface Journal {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  kind: JournalKind;
  year: number;
  pages: number;
  cover: string;
  pdf: string;
}

export const journals: Journal[] = [
  {
    slug: "national-dialogue-prospects-research-paper",
    title: "Ethiopia's National Dialogue Commission: Prospects for the Somali Region",
    subtitle: "An assessment of awareness, historical grievances, and pathways to a more inclusive and effective process.",
    description:
      "A mixed-methods study of regional awareness, confidence, representation, historical grievances, and the conditions needed for Ethiopia's national dialogue to produce durable outcomes in the Somali Region.",
    kind: "Research Paper",
    year: 2026,
    pages: 5,
    cover: "/journals/covers/national-dialogue-prospects-research-paper.jpg",
    pdf: "/journals/files/national-dialogue-prospects-research-paper.pdf"
  },
  {
    slug: "national-dialogue-prospects-policy-brief",
    title: "Ethiopia's National Dialogue Commission: Prospects for the Somali Region",
    subtitle: "A survey-based assessment of awareness, expectations, and pathways to a more inclusive dialogue process.",
    description:
      "A concise policy brief on the communication, inclusion, representation, transparency, and implementation priorities that will shape the national dialogue's legitimacy in the Somali Region.",
    kind: "Policy Brief",
    year: 2026,
    pages: 4,
    cover: "/journals/covers/national-dialogue-prospects-policy-brief.jpg",
    pdf: "/journals/files/national-dialogue-prospects-policy-brief.pdf"
  },
  {
    slug: "reshaping-somali-region-education-system",
    title: "Reshaping the Somali Region Education System",
    subtitle: "Impediments, efforts and achievements.",
    description:
      "Evidence and recommendations addressing public-school resources, foundational learning, English-language transition, teacher support, assessment, and school accountability.",
    kind: "Policy Brief",
    year: 2026,
    pages: 5,
    cover: "/journals/covers/reshaping-somali-region-education-system.jpg",
    pdf: "/journals/files/reshaping-somali-region-education-system.pdf"
  },
  {
    slug: "food-security-over-sovereignty",
    title: "Food Security over Sovereignty",
    subtitle: "Can the Somali Region achieve food self-sufficiency in the face of climate change and global food crises?",
    description:
      "An assessment of the opportunities and constraints shaping food self-sufficiency, with recommendations for climate-resilient investment, pastoral production systems, value chains, and local institutions.",
    kind: "Policy Brief",
    year: 2026,
    pages: 5,
    cover: "/journals/covers/food-security-over-sovereignty.jpg",
    pdf: "/journals/files/food-security-over-sovereignty.pdf"
  }
];

export function getJournalBySlug(slug: string): Journal | undefined {
  return journals.find((journal) => journal.slug === slug);
}
