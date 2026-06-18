import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CloudSun, Handshake, HeartPulse, Shield, Wheat } from "lucide-react";

import { ButtonLink } from "@/components/site/ButtonLink";
import { CTASection } from "@/components/site/CTASection";
import { IconCard, NewsFeatureCard, NumberedRow, PublicationCard, StatItem } from "@/components/site/Cards";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import type { NewsListItem } from "@/lib/site/news";
import type { ContentResolver } from "@/lib/site/types";

interface HomePageContentProps {
  c: ContentResolver;
  newsItems: NewsListItem[];
}

export function HomePageContent({ c, newsItems }: HomePageContentProps) {
  const heroImage = c.i(
    "home.hero.image",
    "https://images.unsplash.com/photo-1576073383046-eaf2c135314d?auto=format&fit=crop&w=1200&q=80"
  );

  const whatWeDoImage = c.i(
    "home.whatwedo.image",
    "https://images.unsplash.com/photo-1665491961263-2c9f8deebf63?auto=format&fit=crop&w=1200&q=80"
  );

  const publications = [
    {
      image: c.i(
        "home.publication.1.image",
        "https://images.unsplash.com/photo-1598613717491-e61f4b242c5e?auto=format&fit=crop&w=1200&q=80"
      ),
      tag: c.t("home.publication.1.tag", "POLICY BRIEF"),
      title: c.t(
        "home.publication.1.title",
        "Climate Adaptation Strategies for Pastoral Communities in the Somali Region"
      ),
      date: c.t("home.publication.1.date", "January 2026")
    },
    {
      image: c.i(
        "home.publication.2.image",
        "https://images.unsplash.com/photo-1740382242940-5693432d977a?auto=format&fit=crop&w=1200&q=80"
      ),
      tag: c.t("home.publication.2.tag", "RESEARCH REPORT"),
      title: c.t(
        "home.publication.2.title",
        "Governance Reform and Institutional Capacity in the Somali Regional State"
      ),
      date: c.t("home.publication.2.date", "December 2025")
    },
    {
      image: c.i(
        "home.publication.3.image",
        "https://images.unsplash.com/photo-1712700004723-4adc42a3532f?auto=format&fit=crop&w=1200&q=80"
      ),
      tag: c.t("home.publication.3.tag", "WORKING PAPER"),
      title: c.t(
        "home.publication.3.title",
        "Cross-Border Trade and Economic Integration in the Horn of Africa"
      ),
      date: c.t("home.publication.3.date", "November 2025")
    }
  ];

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
            <Image src={heroImage} alt="Research collaboration" fill className="hero-home-image" sizes="(max-width: 1024px) 100vw, 42vw" />
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
              eyebrow={c.t("home.news.eyebrow", "LATEST NEWS")}
              title={c.t("home.news.title", "Latest updates from Hiraad")}
              size="lg"
            />
            <Link href="/news-media" className="home-news-view-all">
              <span>{c.t("home.news.viewAll", "View All News")}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>

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
            <IconCard
              icon={Shield}
              title={c.t("home.research.card1.title", "Governance &\nInstitutions")}
              description={c.t(
                "home.research.card1.description",
                "Strengthening governance frameworks, institutional capacity, and public administration across the Somali Region."
              )}
            />
            <IconCard
              icon={Handshake}
              title={c.t("home.research.card2.title", "Peace &\nCohesion")}
              description={c.t(
                "home.research.card2.description",
                "Research on conflict resolution, peacebuilding, and social cohesion in pastoralist and cross-border communities."
              )}
            />
            <IconCard
              icon={CloudSun}
              title={c.t("home.research.card3.title", "Climate\nResilience")}
              description={c.t(
                "home.research.card3.description",
                "Addressing climate adaptation, drought response, and environmental policy for vulnerable pastoral communities."
              )}
            />
            <IconCard
              icon={Wheat}
              title={c.t("home.research.card4.title", "Livelihoods &\nEconomic Development")}
              description={c.t(
                "home.research.card4.description",
                "Exploring pathways for sustainable economic growth, trade, and livelihood diversification."
              )}
            />
            <IconCard
              icon={HeartPulse}
              title={c.t("home.research.card5.title", "Social Services\n& Education")}
              description={c.t(
                "home.research.card5.description",
                "Improving access to quality education, healthcare, and social services in underserved communities."
              )}
            />
            <IconCard
              icon={ArrowRight}
              title={c.t("home.research.card6.title", "View All\nResearch Areas")}
              description={c.t(
                "home.research.card6.description",
                "Explore the full breadth of our policy research and ongoing projects."
              )}
              href="/research"
              dark
            />
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
              <Image src={whatWeDoImage} alt="Field research" fill className="whatwedo-image" sizes="(max-width: 1024px) 100vw, 42vw" />
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
              title={c.t("home.wwd.5.title", "Publications & Knowledge Sharing")}
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
            <StatItem value={c.t("home.stats.1.value", "50+")} label={c.t("home.stats.1.label", "Research Publications")} />
            <StatItem value={c.t("home.stats.2.value", "30+")} label={c.t("home.stats.2.label", "Policy Briefs Delivered")} />
            <StatItem value={c.t("home.stats.3.value", "20+")} label={c.t("home.stats.3.label", "Public Forums Hosted")} />
            <StatItem value={c.t("home.stats.4.value", "3")} label={c.t("home.stats.4.label", "Regional Offices")} />
          </div>
        </div>
      </section>

      <section className="section section--surface home-publications">
        <div className="container">
          <div className="section-heading-row">
            <SectionIntro
              eyebrow={c.t("home.publications.eyebrow", "LATEST PUBLICATIONS")}
              title={c.t("home.publications.title", "Recent research & policy briefs")}
              size="lg"
            />
            <Link href="/publications" className="home-publications-view-all">
              <span>{c.t("home.publications.viewAll", "View All Publications")}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid--three">
            {publications.map((item) => (
              <PublicationCard
                key={item.title}
                image={item.image}
                tag={item.tag}
                title={item.title}
                date={item.date}
                href="/publications/decentralization-service-delivery-performance-somali-region"
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
