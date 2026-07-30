import type { Metadata } from "next";

import { EventsPageContent } from "@/components/pages/EventsPageContent";
import { getContentResolver } from "@/lib/site/content";
import { getEventsContent } from "@/lib/site/events";

export const metadata: Metadata = {
  title: "News & Events | Hiraad Institute",
  description: "Follow Hiraad Institute news, institutional updates, public forums, seminars, and community events."
};

export default async function NewsEventsPage() {
  const [c, events] = await Promise.all([
    getContentResolver("events"),
    getEventsContent()
  ]);

  return <EventsPageContent c={c} events={events} />;
}
