import Image from "next/image";
import { Briefcase, Landmark, Megaphone, Users } from "lucide-react";

import { CTASection } from "@/components/site/CTASection";
import { IconCard, NumberedRow } from "@/components/site/Cards";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import type { ContentResolver } from "@/lib/site/types";

interface AboutPageContentProps {
  c: ContentResolver;
}

export function AboutPageContent({ c }: AboutPageContentProps) {
  const storyImage1 = c.i(
    "about.story.image1",
    "/images/events/facebook/hiraad-pre-launch-workshop-2024/469714100_122158515128318499_6854909978711075528_n.jpg"
  );
  const storyImage2 = c.i(
    "about.story.image2",
    "/images/events/facebook/education-research-stakeholder-preview-2025/574606027_122215730120318499_3578089242469857428_n.jpg"
  );

  return (
    <PageShell t={c.t}>
      <PageHero
        eyebrow={c.t("about.hero.eyebrow", "ABOUT HIRAAD")}
        title={c.t("about.hero.title", "Shaping policy through\nlocally grounded research")}
        description={c.t(
          "about.hero.description",
          "Hiraad Institute is an independent, non-partisan, non-profit public policy research institute\nbased in Jigjiga, Somali Region, Ethiopia."
        )}
      />

      <section className="section section--surface about-story">
        <div className="container split-grid">
          <div className="stack">
            <SectionIntro
              eyebrow={c.t("about.story.eyebrow", "OUR STORY")}
              title={c.t("about.story.title", "Why Hiraad exists")}
              size="lg"
            />
            <p className="body-copy">
              {c.t(
                "about.story.p1",
                "For decades, policy decisions affecting the Somali Region have been shaped without sufficient input from the communities they impact most. Hiraad Institute was founded to change that."
              )}
            </p>
            <p className="body-copy">
              {c.t(
                "about.story.p2",
                'The word "Hiraad" means "vision" in Somali — a fitting name for an institute committed to seeing clearly, thinking independently, and working toward a future where policy is informed by evidence and grounded in local realities.'
              )}
            </p>
            <p className="body-copy">
              {c.t(
                "about.story.p3",
                "We believe that sustainable development and lasting peace in the Horn of Africa require research institutions that understand the region from the inside — its languages, cultures, histories, and aspirations."
              )}
            </p>
          </div>

          <div className="stack">
            <div className="image-block image-block--large">
              <Image src={storyImage1} alt="Participants at Hiraad's pre-launch workshop" fill className="cover-image" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            <div className="image-block image-block--small">
              <Image src={storyImage2} alt="Participant at a Hiraad education research consultation" fill className="cover-image" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark about-mission-vision">
        <div className="container split-grid">
          <article className="dark-panel">
            <p className="eyebrow eyebrow--accent">{c.t("about.mission.eyebrow", "WHO WE ARE")}</p>
            <p>{c.t("about.mission.text", "Hiraad Institute is dedicated to advancing evidence-based policymaking in the Somali Region of Ethiopia by producing high-quality, independent research; fostering inclusive policy dialogue; and strengthening the capacity of institutions and communities to engage effectively in governance and development processes.")}</p>
          </article>

          <article className="dark-panel">
            <p className="eyebrow eyebrow--accent">{c.t("about.vision.eyebrow", "OUR VISION")}</p>
            <p>{c.t("about.vision.text", "Hiraad Institute envisions a Somali Region where public policy is informed by evidence rather than assumption, where communities actively participate in shaping their futures, and where local knowledge contributes meaningfully to national, regional, and global policy debates.")}</p>
          </article>
        </div>
      </section>

      <section className="section section--surface about-values">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("about.values.eyebrow", "CORE VALUES")}
            title={c.t("about.values.title", "The principles that guide our work")}
            size="lg"
          />

          <div className="stack stack--tight">
            <NumberedRow
              index="01"
              title={c.t("about.values.1.title", "Intellectual Independence")}
              description={c.t(
                "about.values.1.description",
                "Hiraad maintains strict non-partisanship and analytical independence. Research outputs are insulated from political pressure, donor influence, and advocacy-driven distortion."
              )}
            />
            <NumberedRow
              index="02"
              title={c.t("about.values.2.title", "Contextual Integrity")}
              description={c.t(
                "about.values.2.description",
                "All research and policy analysis is grounded in the social, cultural, historical, and economic realities of the Somali Region and the wider Somali context."
              )}
            />
            <NumberedRow
              index="03"
              title={c.t("about.values.3.title", "Inclusivity & Participation")}
              description={c.t(
                "about.values.3.description",
                "The Institute prioritizes engagement with marginalized populations, including pastoralists, women, youth, and remote communities, recognizing them as essential contributors to knowledge production."
              )}
            />
            <NumberedRow
              index="04"
              title={c.t("about.values.4.title", "Transparency & Accountability")}
              description={c.t(
                "about.values.4.description",
                "Hiraad operates with openness in its governance, partnerships, and outputs, reinforcing public trust and institutional credibility."
              )}
            />
            <NumberedRow
              index="05"
              title={c.t("about.values.5.title", "Policy Impact Orientation")}
              description={c.t(
                "about.values.5.description",
                "Research is designed not only to inform but to influence — through actionable recommendations, stakeholder engagement, and sustained dialogue with decision-makers."
              )}
            />
          </div>
        </div>
      </section>

      <section className="section section--muted about-constituencies">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("about.constituencies.eyebrow", "WHO WE SERVE")}
            title={c.t("about.constituencies.title", "Our constituencies and stakeholders")}
            size="lg"
          />

          <div className="grid grid--four">
            <IconCard
              icon={Landmark}
              title={c.t("about.constituencies.1.title", "Policymakers & Government")}
              description={c.t(
                "about.constituencies.1.description",
                "Policy briefs, technical notes, evidence-based recommendations, expert briefings, and closed-door consultations for federal, regional, and local governance structures."
              )}
            />
            <IconCard
              icon={Users}
              title={c.t("about.constituencies.2.title", "Civil Society & Development Partners")}
              description={c.t(
                "about.constituencies.2.description",
                "Co-produced research, advocacy strengthening through evidence, context-sensitive program design, and evaluation of development interventions."
              )}
            />
            <IconCard
              icon={Briefcase}
              title={c.t("about.constituencies.3.title", "Private Sector & Economic Actors")}
              description={c.t(
                "about.constituencies.3.description",
                "Research on investment climates, regulatory environments, infrastructure, market access, employment, skills development, and value chain growth."
              )}
            />
            <IconCard
              icon={Megaphone}
              title={c.t("about.constituencies.4.title", "Communities, Media & Public")}
              description={c.t(
                "about.constituencies.4.description",
                "Simplified reports, public forums, panel discussions, community outreach programs, media briefings, and commentary for informed citizens."
              )}
            />
          </div>
        </div>
      </section>

      <section className="section section--surface about-approach">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("about.approach.eyebrow", "OUR APPROACH")}
            title={c.t("about.approach.title", "The Hiraad Policy\nImpact Cycle")}
            description={c.t(
              "about.approach.description",
              "Hiraad applies a structured, cyclical, and adaptive policy engagement model designed to ensure that research is grounded in local realities, responsive to national priorities, and capable of generating sustained policy impact."
            )}
            size="lg"
          />

          <div className="grid grid--two approach-grid">
            <div className="stack approach-stack">
              <article className="approach-step">
                <p className="approach-step-number">{c.t("about.approach.1.number", "01")}</p>
                <h3>{c.t("about.approach.1.title", "Contextual Scoping")}</h3>
                <p>
                  {c.t(
                    "about.approach.1.description",
                    "Field engagement with communities, consultations with policymakers, and review of existing policies to identify real needs."
                  )}
                </p>
              </article>
              <article className="approach-step">
                <p className="approach-step-number">{c.t("about.approach.2.number", "02")}</p>
                <h3>{c.t("about.approach.2.title", "Research & Evidence")}</h3>
                <p>
                  {c.t(
                    "about.approach.2.description",
                    "Methodologically sound research with qualitative and quantitative methods, integrating historical and political economy perspectives."
                  )}
                </p>
              </article>
              <article className="approach-step">
                <p className="approach-step-number">{c.t("about.approach.3.number", "03")}</p>
                <h3>{c.t("about.approach.3.title", "Analysis & Policy Framing")}</h3>
                <p>
                  {c.t(
                    "about.approach.3.description",
                    "Rigorous analysis identifying patterns, drivers, and feasible policy options within existing constraints."
                  )}
                </p>
              </article>
              <article className="approach-step">
                <p className="approach-step-number">{c.t("about.approach.4.number", "04")}</p>
                <h3>{c.t("about.approach.4.title", "Stakeholder Validation")}</h3>
                <p>
                  {c.t(
                    "about.approach.4.description",
                    "Testing assumptions through technical workshops, closed-door briefings, roundtables, and community consultations."
                  )}
                </p>
              </article>
            </div>

            <div className="stack approach-stack">
              <article className="approach-step">
                <p className="approach-step-number">{c.t("about.approach.5.number", "05")}</p>
                <h3>{c.t("about.approach.5.title", "Policy Advisory & Dialogue")}</h3>
                <p>
                  {c.t(
                    "about.approach.5.description",
                    "Policy briefs for decision-makers, advisory support, high-level forums, and public dissemination through media and open events."
                  )}
                </p>
              </article>
              <article className="approach-step">
                <p className="approach-step-number">{c.t("about.approach.6.number", "06")}</p>
                <h3>{c.t("about.approach.6.title", "Capacity Building")}</h3>
                <p>
                  {c.t(
                    "about.approach.6.description",
                    "Training on policy analysis, support for institutional learning systems, development of tools and frameworks, mentorship and peer learning."
                  )}
                </p>
              </article>
              <article className="approach-step">
                <p className="approach-step-number">{c.t("about.approach.7.number", "07")}</p>
                <h3>{c.t("about.approach.7.title", "Monitoring & Learning")}</h3>
                <p>
                  {c.t(
                    "about.approach.7.description",
                    "Tracking uptake of recommendations, evaluating policy outcomes, and documenting lessons for continuous institutional learning."
                  )}
                </p>
              </article>
              <article className="approach-step">
                <p className="approach-step-number">{c.t("about.approach.8.number", "08")}</p>
                <h3>{c.t("about.approach.8.title", "Renewal & Adjustment")}</h3>
                <p>
                  {c.t(
                    "about.approach.8.description",
                    "Strategic reflection informed by changing political, social, and environmental conditions to ensure ongoing relevance."
                  )}
                </p>
              </article>
            </div>
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
