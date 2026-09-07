import stagedEvents from "@/content/hiraad-facebook-events.json";

interface StagedEvent {
  title: string;
  slug: { current: string };
  date: string;
  location?: string | null;
  excerpt: string;
  highlight?: string | null;
  author?: string | null;
  category?: string | null;
}

const imageFiles: Record<string, string[]> = {
  "hope-institute-mou-signing-2026": [
    "hope-institute-mou-signing-2026-01.jpg",
    "hope-institute-mou-signing-2026-02.jpg",
    "hope-institute-mou-signing-2026-03.jpg",
    "hope-institute-mou-signing-2026-04.jpg"
  ],
  "youth-council-leadership-meeting-2024": [
    "youth-council-leadership-meeting-2024-01.jpg",
    "youth-council-leadership-meeting-2024-02.jpg",
    "youth-council-leadership-meeting-2024-03.jpg",
    "youth-council-leadership-meeting-2024-04.jpg",
    "youth-council-leadership-meeting-2024-05.jpg",
    "youth-council-leadership-meeting-2024-06.jpg",
    "youth-council-leadership-meeting-2024-07.jpg",
    "youth-council-leadership-meeting-2024-08.jpg",
    "youth-council-leadership-meeting-2024-09.jpg",
    "youth-council-leadership-meeting-2024-10.jpg",
    "youth-council-leadership-meeting-2024-11.jpg"
  ],
  "six-research-concepts-workshop-2024": [
    "six-research-concepts-workshop-2024-01.jpg",
    "six-research-concepts-workshop-2024-02.jpg",
    "six-research-concepts-workshop-2024-03.jpg",
    "six-research-concepts-workshop-2024-04.jpg",
    "six-research-concepts-workshop-2024-05.jpg",
    "six-research-concepts-workshop-2024-06.jpg",
    "six-research-concepts-workshop-2024-07.jpg",
    "six-research-concepts-workshop-2024-08.jpg",
    "six-research-concepts-workshop-2024-09.jpg",
    "six-research-concepts-workshop-2024-10.jpg",
    "six-research-concepts-workshop-2024-11.jpg",
    "six-research-concepts-workshop-2024-12.jpg"
  ],
  "hiraad-volunteers-consultation-2025": [
    "hiraad-volunteers-consultation-2025-01.jpg",
    "hiraad-volunteers-consultation-2025-02.jpg",
    "hiraad-volunteers-consultation-2025-03.jpg",
    "hiraad-volunteers-consultation-2025-04.jpg",
    "hiraad-volunteers-consultation-2025-05.jpg",
    "hiraad-volunteers-consultation-2025-06.jpg",
    "hiraad-volunteers-consultation-2025-07.jpg",
    "hiraad-volunteers-consultation-2025-08.jpg",
    "hiraad-volunteers-consultation-2025-09.jpg",
    "hiraad-volunteers-consultation-2025-10.jpg",
    "hiraad-volunteers-consultation-2025-11.jpg",
    "hiraad-volunteers-consultation-2025-12.jpg"
  ],
  "data-collection-familiarization-roundtable-2026": [
    "data-collection-familiarization-roundtable-2026-01.jpg",
    "data-collection-familiarization-roundtable-2026-02.jpg",
    "data-collection-familiarization-roundtable-2026-03.jpg",
    "data-collection-familiarization-roundtable-2026-04.jpg",
    "data-collection-familiarization-roundtable-2026-05.jpg",
    "data-collection-familiarization-roundtable-2026-06.jpg",
    "data-collection-familiarization-roundtable-2026-07.jpg",
    "data-collection-familiarization-roundtable-2026-08.jpg",
    "data-collection-familiarization-roundtable-2026-09.jpg",
    "data-collection-familiarization-roundtable-2026-10.jpg",
    "data-collection-familiarization-roundtable-2026-11.jpg",
    "data-collection-familiarization-roundtable-2026-12.jpg",
    "data-collection-familiarization-roundtable-2026-13.jpg",
    "data-collection-familiarization-roundtable-2026-14.jpg",
    "data-collection-familiarization-roundtable-2026-15.jpg",
    "data-collection-familiarization-roundtable-2026-16.jpg",
    "data-collection-familiarization-roundtable-2026-17.jpg",
    "data-collection-familiarization-roundtable-2026-18.jpg",
    "data-collection-familiarization-roundtable-2026-19.jpg"
  ],
  "research-data-collection-training-cohort-two-2026": [
    "research-data-collection-training-cohort-two-2026-01.jpg",
    "research-data-collection-training-cohort-two-2026-02.jpg",
    "research-data-collection-training-cohort-two-2026-03.jpg",
    "research-data-collection-training-cohort-two-2026-04.jpg",
    "research-data-collection-training-cohort-two-2026-05.jpg",
    "research-data-collection-training-cohort-two-2026-06.jpg",
    "research-data-collection-training-cohort-two-2026-07.jpg",
    "research-data-collection-training-cohort-two-2026-08.jpg",
    "research-data-collection-training-cohort-two-2026-09.jpg",
    "research-data-collection-training-cohort-two-2026-10.jpg"
  ],
  "research-journal-launch-certification-2026": [
    "research-journal-launch-certification-2026-01.jpg",
    "research-journal-launch-certification-2026-02.jpg",
    "research-journal-launch-certification-2026-03.jpg",
    "research-journal-launch-certification-2026-04.jpg",
    "research-journal-launch-certification-2026-05.jpg",
    "research-journal-launch-certification-2026-06.jpg",
    "research-journal-launch-certification-2026-07.jpg",
    "research-journal-launch-certification-2026-08.jpg",
    "research-journal-launch-certification-2026-09.jpg",
    "research-journal-launch-certification-2026-10.jpg",
    "research-journal-launch-certification-2026-11.jpg",
    "research-journal-launch-certification-2026-12.jpg"
  ],
  "hiraad-pre-launch-workshop-2024": [
    "469459171_122158514912318499_2443519684895701214_n.jpg",
    "469582863_122158515494318499_6025401238889922049_n.jpg",
    "469701162_122158515020318499_4295711161976687983_n.jpg",
    "469714100_122158515128318499_6854909978711075528_n.jpg",
    "469826816_122158515314318499_4644162107258005886_n.jpg"
  ],
  "hiraad-official-launch-2024": [
    "launch-01.jpg",
    "launch-02.jpg",
    "launch-03.jpg",
    "launch-04.jpg",
    "launch-05.jpg"
  ],
  "shaping-media-reporting-roundtable-2024": [
    "473029036_122166235358318499_5235080633841027297_n.jpg"
  ],
  "somali-region-youth-forum-2025": [
    "492252230_122186375930318499_6224321282406955709_n.jpg"
  ],
  "smugglers-speculators-city-book-launch-2025": [
    "526845040_122203628558318499_569646122467238630_n.jpg"
  ],
  "winning-the-heart-book-launch-2025": [
    "549606785_122210307752318499_5183016457324252639_n.jpg"
  ],
  "education-research-stakeholder-preview-2025": [
    "574338631_122215730768318499_7040375440360159517_n.jpg",
    "574579360_122215730234318499_2264106074025830921_n.jpg",
    "574597304_122215730084318499_3897533672993057917_n.jpg",
    "574606027_122215730120318499_3578089242469857428_n.jpg",
    "576804555_122215730198318499_3169815877628132059_n.jpg"
  ],
  "somali-region-youth-forum-2026": [
    "615525496_122225388356318499_7076678841801677987_n.jpg"
  ],
  "research-data-collection-training-2026": [
    "research-data-collection-training-2026-01.jpg",
    "research-data-collection-training-2026-02.jpg",
    "research-data-collection-training-2026-03.jpg",
    "research-data-collection-training-2026-04.jpg",
    "research-data-collection-training-2026-05.jpg",
    "research-data-collection-training-2026-06.jpg",
    "research-data-collection-training-2026-07.jpg",
    "research-data-collection-training-2026-08.jpg",
    "research-data-collection-training-2026-09.jpg",
    "research-data-collection-training-2026-10.jpg",
    "research-data-collection-training-2026-11.jpg",
    "research-data-collection-training-2026-12.jpg"
  ],
  "hiraad-education-forum-2026": [
    "630433442_122228951144318499_3995938528270845913_n.jpg",
    "632125359_122228950886318499_7790739670162621544_n.jpg",
    "632406582_122228950814318499_7929000161118065937_n.jpg",
    "632744738_122228951186318499_1871560839601418806_n.jpg",
    "632984126_122228951000318499_3183042710481845610_n.jpg"
  ],
  "diaspora-role-regional-stability-forum-2026": [
    "690637761_122240903258318499_5980456769841465231_n.jpg",
    "690640859_122240903516318499_1013689934816305893_n.jpg",
    "690647854_122240903192318499_690661503158033478_n.jpg",
    "690804014_122240903540318499_800590403098143574_n.jpg",
    "694593095_122240903204318499_1908412953319667873_n.jpg"
  ],
  "somali-region-research-journal-consultation-2026": [
    "710638955_122243593826318499_4265697690401493437_n.jpg",
    "710827323_122243593334318499_6488692603105212605_n.jpg",
    "711985802_122243593634318499_9059887982295309069_n.jpg",
    "712447491_122243593124318499_1483067511488482576_n.jpg",
    "712610083_122243593118318499_2035787636680226726_n.jpg"
  ],
  "national-dialogue-somali-region-research-presentation-2026": [
    "739243646_122247387728318499_8421609098759097339_n.jpg"
  ],
  "hiraad-rvi-researchers-roundtable-2026": [
    "3623aaa3bcf05a0f.jpg",
    "725b878438103bc0.jpg",
    "9ca0a6c661f187ea.jpg",
    "ad422fc021131f58.jpg"
  ]
};

export const localEventRows = (stagedEvents as StagedEvent[]).map((event) => {
  const slug = event.slug.current;
  const images = (imageFiles[slug] ?? []).map((file) => `/images/events/facebook/${slug}/${file}`);

  return {
    slug,
    title: event.title,
    date: event.date,
    location: event.location ?? "",
    category: event.category ?? "Institutional Event",
    author: event.author ?? "Hiraad Institute",
    previewDescription: event.excerpt,
    introTitle: "Overview",
    introText: event.excerpt,
    detailsTitle: "Event details",
    highlightsTitle: "Highlights",
    highlightsText: event.highlight ?? "",
    previewImage: images[0],
    galleryImages: images,
    relatedEventSlugs: []
  };
});
