import Image from "next/image";
import Link from "next/link";

import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import type { EventContent } from "@/lib/site/events";
import type { ContentResolver } from "@/lib/site/types";

interface EventsPageContentProps {
  c: ContentResolver;
  events: EventContent[];
}

export function EventsPageContent({ c, events }: EventsPageContentProps) {
  const localizedEvents = events.map((event, index) => ({
    ...event,
    meta: c.t(`events.featured.${index + 1}.meta`, event.previewMeta),
    title: c.t(`events.featured.${index + 1}.title`, event.title),
    description: c.t(`events.featured.${index + 1}.description`, event.previewDescription),
    href: `/events/${event.slug}`
  }));

  return (
    <PageShell t={c.t}>
      <PageHero
        eyebrow={c.t("events.hero.eyebrow", "NEWS & EVENTS")}
        title={c.t("events.hero.title", "News and events")}
        description={c.t(
          "events.hero.description",
          "Follow Hiraad Institute's public forums, research conversations, seminars, and institutional updates."
        )}
      />

      <section className="section section--surface events-directory">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("events.featured.eyebrow", "EVENTS")}
            title={c.t("events.featured.title", "Forums, seminars, and public conversations")}
            description={c.t(
              "events.featured.description",
              "Browse Hiraad's recent events and institutional activities."
            )}
            eyebrowTone="accent"
            size="xl"
          />

          <div className="events-directory-toolbar">
            <p>
              {localizedEvents.length} {localizedEvents.length === 1 ? "event" : "events"}
            </p>
          </div>

          <div className="events-directory-grid">
            {localizedEvents.map((event) => (
              <article className="event-directory-card" key={event.slug}>
                <Link className="event-directory-card-image-link" href={event.href} aria-label={`View ${event.title}`}>
                  <span className="event-directory-card-image-wrap">
                    <Image
                      src={event.previewImage}
                      alt={event.title}
                      fill
                      className="event-directory-card-image"
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                  </span>
                </Link>
                <div className="event-directory-card-content">
                  <p className="event-directory-card-meta">{event.meta}</p>
                  <h2>
                    <Link href={event.href}>{event.title}</Link>
                  </h2>
                  {event.description ? <p>{event.description}</p> : null}
                  <Link className="event-directory-card-link" href={event.href}>
                    View event
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={c.t("shared.cta.title", "Partner with us to shape\npolicy that matters")}
        description={c.t(
          "shared.cta.description",
          "Whether you are a government institution, international organization, academic partner, or civil society group, we welcome collaboration that strengthens evidence-based policymaking in the Horn of Africa."
        )}
        primaryLabel={c.t("shared.cta.primary", "Get In Touch")}
        primaryHref="/contact"
        secondaryLabel={c.t("shared.cta.secondary", "Subscribe to Updates")}
        secondaryHref="#newsletter"
      />
    </PageShell>
  );
}
