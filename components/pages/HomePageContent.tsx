import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/site/ButtonLink";
import { CTASection } from "@/components/site/CTASection";
import { IconCard, NewsFeatureCard, NumberedRow, PublicationCard, StatItem } from "@/components/site/Cards";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import type { EventContent } from "@/lib/site/events";
import { journals } from "@/lib/site/journals";
import { getResearchAreas } from "@/lib/site/research-areas";
import type { NewsListItem } from "@/lib/site/news";
import type { ContentResolver } from "@/lib/site/types";

interface HomePageContentProps {
  c: ContentResolver;
  newsItems: NewsListItem[];
  events: EventContent[];
}

export function HomePageContent({ c, newsItems, events }: HomePageContentProps) {
  const heroImage = c.i(
    "home.hero.image",
    "/images/home/hero-workshop-group-work.jpg"
  );

  const whatWeDoImage = c.i(
    "home.whatwedo.image",
    "/images/events/facebook/somali-region-research-journal-consultation-2026/710638955_122243593826318499_4265697690401493437_n.jpg"
  );

  const featuredJournals = journals.slice(0, 3);

  const recentEvents = events.slice(0, 4);

  const researchAreas = getResearchAreas(c);

  return (
    <PageShell t={c.t}>
      <section className="hero-home">
        <div className="container hero-home-inner">
          <div className="hero-home-content">
            <span className="hero-pill">{c.t("home.hero.pill", "Independent Policy Research")}</span>
            <h1>{c.t("home.hero.title", "Grounding Policy\nin Local Realities")}</h1>
            <p>
              {c.t(
                "home.hero.description",
                "Hiraad Institute brings evidence-based Somali perspectives\ninto policy decisions across the Horn of Africa."
              )}
            </p>
            <div className="hero-actions">
              <ButtonLink href="/research" label={c.t("home.hero.primary", "Explore Our Research")} variant="primary" />
              <ButtonLink href="/about" label={c.t("home.hero.secondary", "About Hiraad")} variant="outline-light" />
            </div>
          </div>

          <div className="hero-home-image-wrap">
            <Image src={heroImage} alt="Participants working in small groups at a Hiraad Institute workshop" fill className="hero-home-image" sizes="(max-width: 1024px) 100vw, 42vw" />
          </div>
        </div>
      </section>

      <section className="section section--surface home-mission">
        <div className="container">
          <p className="eyebrow">{c.t("home.mission.eyebrow", "WHO WE ARE")}</p>
          <h2 className="home-mission-title">{c.t("home.mission.title", "Locally grounded research for\npolicy that serves communities")}</h2>
          <p className="home-mission-description">
            {c.t(
              "home.mission.description",
              "Based in Jigjiga, Somali Region, Ethiopia, Hiraad Institute is an independent, non-partisan, non-profit public policy research institute. We exist to bring locally grounded Somali perspectives into policy decisions at regional, national, and Horn of Africa levels."
            )}
          </p>
          <div className="mission-divider" />

          <div className="triple-values">
            <article>
              <h3>{c.t("home.mission.value1.title", "Evidence-Led")}</h3>
              <p>
                {c.t(
                  "home.mission.value1.description",
                  "Facts first, clear reasoning, no exaggeration. Our work is grounded in rigorous methodology."
                )}
              </p>
            </article>

            <article>
              <h3>{c.t("home.mission.value2.title", "Independent")}</h3>
              <p>
                {c.t(
                  "home.mission.value2.description",
                  "Neutral, non-partisan, and public-interest focused. We serve communities, not agendas."
                )}
              </p>
            </article>

            <article>
              <h3>{c.t("home.mission.value3.title", "Actionable")}</h3>
              <p>
                {c.t(
                  "home.mission.value3.description",
                  "Practical recommendations, not abstract theory. Our research translates into real policy guidance."
                )}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--surface home-news">
        <div className="container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow={c.t("home.news.eyebrow", "LATEST")}
              title={c.t("home.news.title", "Latest updates from Hiraad")}
              size="lg"
            />
            <Link href="/news-events" className="home-news-view-all">
              <span>{c.t("home.news.viewAll", "View All News & Events")}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          {newsItems.length > 0 ? (
            <div className="grid grid--three">
              {newsItems.slice(0, 3).map((item) => (
                <NewsFeatureCard
                  key={item.title}
                  image={item.image || "https://images.unsplash.com/photo-1573167643872-43a4664ccf2c?auto=format&fit=crop&w=1200&q=80"}
                  meta={item.meta}
                  title={item.title}
                  excerpt={item.description}
                  href={`/news/${item.slug}`}
                />
              ))}
            </div>
          ) : null}

          <div className={`home-events-grid${newsItems.length > 0 ? " home-events-grid--divided" : ""}`}>
            {recentEvents.map((event) => (
              <article className="event-directory-card" key={event.slug}>
                <Link
                  className="event-directory-card-image-link"
                  href={`/events/${event.slug}`}
                  aria-label={`View ${event.title}`}
                >
                  <span className="event-directory-card-image-wrap">
                    <Image
                      src={event.previewImage}
                      alt={event.title}
                      fill
                      className="event-directory-card-image"
                      sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </span>
                </Link>
                <div className="event-directory-card-content">
                  <p className="event-directory-card-meta">{event.previewMeta}</p>
                  <h3>
                    <Link href={`/events/${event.slug}`}>{event.title}</Link>
                  </h3>
                  {event.previewDescription ? <p>{event.previewDescription}</p> : null}
                  <Link className="event-directory-card-link" href={`/events/${event.slug}`}>
                    View event
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted home-research">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("home.research.eyebrow", "RESEARCH AREAS")}
            title={c.t("home.research.title", "Where we focus our work")}
            description={c.t(
              "home.research.description",
              "Our research spans the critical policy domains shaping the Somali Region and the broader Horn of Africa."
            )}
            size="lg"
          />

          <div className="grid grid--three">
            {researchAreas.map((area) => (
              <IconCard
                key={area.id}
                icon={area.icon}
                title={area.title}
                description={area.summary}
              />
            ))}
          </div>

          <div className="home-research-actions">
            <Link href="/research" className="home-research-view-all">
              <span>{c.t("home.research.viewAll", "View All Research Areas")}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--dark home-whatwedo">
        <div className="container whatwedo-grid">
          <div>
            <SectionIntro
              eyebrow={c.t("home.wwd.eyebrow", "WHAT WE DO")}
              title={c.t("home.wwd.title", "From research\nto real impact")}
              description={c.t(
                "home.wwd.description",
                "We produce evidence-based research and turn it into practical policy guidance that decision-makers can act on."
              )}
              eyebrowTone="accent"
              size="lg"
            />
            <div className="whatwedo-image-wrap">
              <Image src={whatWeDoImage} alt="Hiraad researcher presenting at a consultation" fill className="whatwedo-image" sizes="(max-width: 1024px) 100vw, 42vw" />
            </div>
          </div>

          <div className="stack stack--tight">
            <NumberedRow
              index="01"
              dark
              title={c.t("home.wwd.1.title", "Policy Research & Analysis")}
              description={c.t(
                "home.wwd.1.description",
                "Rigorous, evidence-based studies on governance, peace, climate, livelihoods, and social services."
              )}
            />
            <NumberedRow
              index="02"
              dark
              title={c.t("home.wwd.2.title", "Policy Briefs & Advisory")}
              description={c.t(
                "home.wwd.2.description",
                "Concise guidance documents and direct advisory support to institutions and decision-makers."
              )}
            />
            <NumberedRow
              index="03"
              dark
              title={c.t("home.wwd.3.title", "Public Forums & Dialogue")}
              description={c.t(
                "home.wwd.3.description",
                "Convening stakeholders for inclusive dialogue on critical policy issues."
              )}
            />
            <NumberedRow
              index="04"
              dark
              title={c.t("home.wwd.4.title", "Capacity Building")}
              description={c.t(
                "home.wwd.4.description",
                "Training and mentoring local researchers, civil servants, and community leaders."
              )}
            />
            <NumberedRow
              index="05"
              dark
              title={c.t("home.wwd.5.title", "Journals & Knowledge Sharing")}
              description={c.t(
                "home.wwd.5.description",
                "Publishing research findings, policy papers, and reports accessible to all stakeholders."
              )}
            />
          </div>
        </div>
      </section>

      <section className="section section--green-soft home-stats">
        <div className="container">
          <p className="eyebrow">{c.t("home.stats.eyebrow", "OUR IMPACT")}</p>
          <div className="stats-grid">
            <StatItem value={c.t("home.stats.1.value", "15")} label={c.t("home.stats.1.label", "Research Publications")} />
            <StatItem value={c.t("home.stats.2.value", "10")} label={c.t("home.stats.2.label", "Policy Briefs Delivered")} />
            <StatItem value={c.t("home.stats.3.value", "9")} label={c.t("home.stats.3.label", "Public Forums Hosted")} />
            <StatItem value={c.t("home.stats.4.value", "2")} label={c.t("home.stats.4.label", "Regional Offices")} />
          </div>
        </div>
      </section>

      <section className="section section--surface home-publications">
        <div className="container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow={c.t("home.journals.eyebrow", "LATEST PUBLICATIONS")}
              title={c.t("home.journals.title", "Recent research & policy briefs")}
              size="lg"
            />
            <Link href="/research#publications" className="home-publications-view-all">
              <span>{c.t("home.journals.viewAll", "View All Publications")}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid--three">
            {featuredJournals.map((item) => (
              <PublicationCard
                key={item.slug}
                image={item.cover}
                tag={item.kind.toUpperCase()}
                title={item.title}
                date={String(item.year)}
                href={`/journals/${item.slug}`}
              />
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
