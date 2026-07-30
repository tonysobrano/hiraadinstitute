import Image from "next/image";
import Link from "next/link";

import { CTASection } from "@/components/site/CTASection";
import { PageShell } from "@/components/site/PageShell";
import type { EventContent } from "@/lib/site/events";
import type { ContentResolver } from "@/lib/site/types";

interface SingleEventPageContentProps {
  c: ContentResolver;
  event: EventContent;
  relatedEvents: EventContent[];
}

export function SingleEventPageContent({ c, event, relatedEvents }: SingleEventPageContentProps) {
  const hasHighlight = event.highlightsText.trim().length > 0;

  return (
    <PageShell t={c.t}>
      <article className="event-story">
        <header className="event-story-header">
          <div className="container container--narrow">
            <Link href="/news-events" className="event-story-back">
              {c.t("singleEvent.back", "Back to News & Events")}
            </Link>
            <div className="event-story-title">
              <p className="eyebrow eyebrow--accent">{c.t("singleEvent.newsEventsBreadcrumb", "EVENT")}</p>
              <h1>{event.title}</h1>
              {event.previewDescription ? <p className="event-story-summary">{event.previewDescription}</p> : null}
            </div>
            <dl className="event-story-meta">
              {event.date ? (
                <div>
                  <dt>Date</dt>
                  <dd>{event.date}</dd>
                </div>
              ) : null}
              {event.location ? (
                <div>
                  <dt>Location</dt>
                  <dd>{event.location}</dd>
                </div>
              ) : null}
              {event.category ? (
                <div>
                  <dt>Category</dt>
                  <dd>{event.category}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </header>

        <section className="event-story-main">
          <div className="container container--narrow">
            <figure className="event-story-image">
              <Image src={event.previewImage} alt={event.title} fill sizes="(max-width: 767px) 100vw, 1040px" priority />
            </figure>

            <div className="event-story-copy">
              <h2>{event.introTitle}</h2>
              <p>{event.introText}</p>
              {event.author ? (
                <p className="event-story-host">
                  <strong>Hosted by:</strong> {event.author}
                </p>
              ) : null}
              {hasHighlight ? (
                <section className="event-story-highlight">
                  <h3>{event.highlightsTitle}</h3>
                  <p>{event.highlightsText}</p>
                </section>
              ) : null}
            </div>
          </div>
        </section>

        {event.galleryImages.length ? (
          <section id="gallery" className="section section--muted event-story-gallery">
            <div className="container container--narrow">
              <header className="event-story-section-heading">
                <p className="eyebrow eyebrow--accent">{c.t("singleEvent.gallery.eyebrow", "GALLERY")}</p>
                <h2>{c.t("singleEvent.gallery.title", "Event gallery")}</h2>
                <p>
                  {event.galleryImages.length} {event.galleryImages.length === 1 ? "photograph" : "photographs"}
                </p>
              </header>
              <div className="event-story-gallery-grid">
                {event.galleryImages.map((image, index) => (
                  <figure className="event-story-gallery-item" key={`${event.slug}-gallery-${index + 1}`}>
                    <Image
                      src={image}
                      alt={`${event.title}, photograph ${index + 1}`}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {relatedEvents.length ? (
          <section className="section section--surface event-story-related">
            <div className="container container--narrow">
              <header className="event-story-section-heading">
                <p className="eyebrow eyebrow--accent">{c.t("singleEvent.related.eyebrow", "MORE EVENTS")}</p>
                <h2>{c.t("singleEvent.related.title", "Related events")}</h2>
              </header>
              <div className="event-story-related-list">
                {relatedEvents.map((item) => (
                  <Link className="event-story-related-link" href={`/events/${item.slug}`} key={item.slug}>
                    <span>{item.previewMeta}</span>
                    <strong>{item.title}</strong>
                  </Link>
                ))}
              </div>
              <Link className="event-story-all-link" href="/news-events">
                View all events
              </Link>
            </div>
          </section>
        ) : null}
      </article>

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
