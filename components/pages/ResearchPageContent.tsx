import { CTASection } from "@/components/site/CTASection";
import { IconCard } from "@/components/site/Cards";
import { JournalArchive } from "@/components/site/JournalArchive";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import type { Journal } from "@/lib/site/journals";
import { getResearchAreas } from "@/lib/site/research-areas";
import type { ContentResolver } from "@/lib/site/types";
import { CalendarDays, MessagesSquare, Users } from "lucide-react";

interface ResearchPageContentProps {
  c: ContentResolver;
  journals: Journal[];
}

export function ResearchPageContent({ c, journals }: ResearchPageContentProps) {
  const thematicAreas = getResearchAreas(c);

  const serviceCards = [
    {
      title: c.t("research.services.1.title", "Research & Analysis"),
      description: c.t(
        "research.services.1.description",
        "Applied policy research designed around real institutional needs."
      ),
      list: c.t(
        "research.services.1.list",
        "Needs assessment studies\nBaseline and sector diagnostics\nPolitical economy and governance analysis\nField data and methodological outputs"
      )
    },
    {
      title: c.t("research.services.2.title", "Consulting & Advisory"),
      description: c.t(
        "research.services.2.description",
        "Technical support for policy design, reform, and implementation."
      ),
      list: c.t(
        "research.services.2.list",
        "Policy advisory and technical notes\nInstitutional capacity assessments\nStrategic planning and reform support\nMonitoring, evaluation, and impact frameworks"
      )
    },
    {
      title: c.t("research.services.3.title", "Training & Capacity Building"),
      description: c.t(
        "research.services.3.description",
        "Building lasting policy and institutional capability across sectors."
      ),
      list: c.t(
        "research.services.3.list",
        "Policy analysis and research methods training\nData collection and interpretation skills\nGovernance and accountability workshops\nYouth leadership and community facilitation programs"
      )
    }
  ];

  const periodicForums = [
    c.t("research.programs.forum.1", "Youth Forum"),
    c.t("research.programs.forum.2", "Education Forum"),
    c.t("research.programs.forum.3", "Peace and Politics Forum"),
    c.t("research.programs.forum.4", "Development Forum"),
    c.t("research.programs.forum.5", "Civil Society Forum")
  ];

  const cycleSteps = [
    {
      number: c.t("research.cycle.1.number", "01"),
      title: c.t("research.cycle.1.title", "Scoping & Needs Identification"),
      description: c.t(
        "research.cycle.1.description",
        "Field engagement and policy consultations define problem-driven research priorities."
      )
    },
    {
      number: c.t("research.cycle.2.number", "02"),
      title: c.t("research.cycle.2.title", "Evidence Generation"),
      description: c.t(
        "research.cycle.2.description",
        "Methodologically rigorous qualitative and quantitative research captures institutional realities."
      )
    },
    {
      number: c.t("research.cycle.3.number", "03"),
      title: c.t("research.cycle.3.title", "Analysis & Policy Framing"),
      description: c.t(
        "research.cycle.3.description",
        "Findings are synthesized into feasible policy options aligned with institutional constraints."
      )
    },
    {
      number: c.t("research.cycle.4.number", "04"),
      title: c.t("research.cycle.4.title", "Stakeholder Validation"),
      description: c.t(
        "research.cycle.4.description",
        "Draft findings are tested through workshops, consultations, and practitioner feedback."
      )
    },
    {
      number: c.t("research.cycle.5.number", "05"),
      title: c.t("research.cycle.5.title", "Advisory & Application"),
      description: c.t(
        "research.cycle.5.description",
        "Policy briefs, technical notes, and direct advisory engagements support institutional uptake."
      )
    },
    {
      number: c.t("research.cycle.6.number", "06"),
      title: c.t("research.cycle.6.title", "Capacity Strengthening"),
      description: c.t(
        "research.cycle.6.description",
        "Training, tools, and peer learning build durable institutional capability."
      )
    },
    {
      number: c.t("research.cycle.7.number", "07"),
      title: c.t("research.cycle.7.title", "Monitoring & Learning"),
      description: c.t(
        "research.cycle.7.description",
        "Recommendation uptake and policy outcomes are tracked to refine future work."
      )
    },
    {
      number: c.t("research.cycle.8.number", "08"),
      title: c.t("research.cycle.8.title", "Strategic Renewal"),
      description: c.t(
        "research.cycle.8.description",
        "Priorities are adjusted as political, social, and environmental conditions evolve."
      )
    }
  ];

  return (
    <PageShell t={c.t}>
      <PageHero
        eyebrow={c.t("research.hero.eyebrow", "RESEARCH, PROGRAMS AND PARTNERSHIPS")}
        title={c.t("research.hero.title", "Our thematic scope")}
        description={c.t(
          "research.hero.description",
          "The Institute's research focuses on a wide range of disciplines, including policy and governance, the peace-conflict nexus, pastoralism, agriculture and development, climate change and the environment, transitional justice and social cohesion, and history and collective memory."
        )}
      />

      <section className="section section--surface research-thematic">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("research.thematic.eyebrow", "THEMATIC AREAS")}
            title={c.t("research.thematic.title", "Our research and programmatic focus")}
            eyebrowTone="accent"
            size="xl"
          />

          <div className="grid grid--two research-thematic-grid">
            {thematicAreas.map((area) => (
              <div key={area.id} id={area.id} className="research-thematic-item">
                <IconCard icon={area.icon} title={area.title} description={area.description} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted research-services">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("research.services.eyebrow", "WHAT WE DO")}
            title={c.t("research.services.title", "Research, advisory, and institutional support")}
            description={c.t(
              "research.services.description",
              "Our research agenda is implemented through integrated service lines that connect evidence generation to policy action, institutional capacity, and practical implementation."
            )}
            eyebrowTone="accent"
            size="xl"
          />
          <div className="grid grid--three">
            {serviceCards.map((card) => (
              <article key={card.title} className="service-card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <p className="service-card-list">{card.list}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="section section--surface journal-archive">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("journals.archive.eyebrow", "LATEST PUBLICATIONS")}
            title={c.t("journals.archive.title", "Evidence, analysis, and policy recommendations")}
            description={c.t(
              "journals.archive.description",
              "Open any document to read it online, or download the original PDF for offline use."
            )}
            eyebrowTone="accent"
            size="xl"
          />

          <JournalArchive journals={journals} />
        </div>
      </section>

      <section className="section section--muted research-dialogue">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("research.dialogue.eyebrow", "HOW WE ENGAGE")}
            title={c.t("research.dialogue.title", "Dialogue, forums, and community engagement")}
            description={c.t(
              "research.dialogue.description",
              "Beyond publications, Hiraad sustains policy impact through convening, participatory engagement, and iterative stakeholder validation."
            )}
            eyebrowTone="accent"
            size="xl"
          />

          <div className="grid grid--three">
            <article className="info-card">
              <h3>{c.t("research.dialogue.1.title", "Dialogue, Forums & Convenings")}</h3>
              <p>
                {c.t(
                  "research.dialogue.1.description",
                  "Structured multi-stakeholder engagement through policy roundtables, HADAF, youth forums, seminars, and expert consultations that connect evidence to policy deliberation."
                )}
              </p>
            </article>
            <article className="info-card">
              <h3>{c.t("research.dialogue.2.title", "Community Engagement")}</h3>
              <p>
                {c.t(
                  "research.dialogue.2.description",
                  "Participatory consultations, community outreach visits, and feedback systems ensure policy analysis remains grounded in lived realities and locally articulated priorities."
                )}
              </p>
            </article>
            <article className="info-card">
              <h3>{c.t("research.dialogue.3.title", "Media & Public Communication")}</h3>
              <p>
                {c.t(
                  "research.dialogue.3.description",
                  "Commentary and public analysis promote accurate, contextualized discourse around governance and development issues."
                )}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--surface research-programs" id="programs">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("research.programs.eyebrow", "RESEARCH AND PROGRAMMES")}
            title={c.t("research.programs.title", "Major programmes and events")}
            description={c.t(
              "research.programs.description",
              "Hiraad convenes policymakers, researchers, practitioners, and citizens through a flagship annual forum, recurring thematic forums, and need-based policy dialogues."
            )}
            eyebrowTone="accent"
            size="xl"
          />

          <div className="grid grid--three research-programs-grid">
            <article className="info-card">
              <CalendarDays className="icon-card-icon" aria-hidden="true" />
              <h3>{c.t("research.programs.1.title", "Hiraad Annual Dialogue Forum (HADAF)")}</h3>
              <p>
                {c.t(
                  "research.programs.1.description",
                  "The Institute's flagship annual event convenes policymakers, researchers, development practitioners, civil society organizations, community leaders, and citizens from Ethiopia, the Somali Peninsula, and beyond. The forum is a platform for presenting research, debating policy issues, and building strategic partnerships."
                )}
              </p>
            </article>

            <article className="info-card">
              <Users className="icon-card-icon" aria-hidden="true" />
              <h3>{c.t("research.programs.2.title", "Periodic Forums")}</h3>
              <p>
                {c.t(
                  "research.programs.2.description",
                  "Regular forums address emerging regional issues and facilitate dialogue among policymakers, experts, practitioners, and the public."
                )}
              </p>
              <ul className="research-programs-list">
                {periodicForums.map((forum) => (
                  <li key={forum}>{forum}</li>
                ))}
              </ul>
            </article>

            <article className="info-card">
              <MessagesSquare className="icon-card-icon" aria-hidden="true" />
              <h3>{c.t("research.programs.3.title", "Occasional Forums")}</h3>
              <p>
                {c.t(
                  "research.programs.3.description",
                  "Need-based policy dialogues and panel discussions are organized in response to emerging developments and priority issues affecting the region."
                )}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--dark research-cycle">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("research.cycle.eyebrow", "INSTITUTIONAL APPROACH")}
            title={c.t("research.cycle.title", "The Hiraad Policy Impact Cycle")}
            description={c.t(
              "research.cycle.description",
              "Our structured model links contextual scoping, research, advisory engagement, institutional learning, and strategic renewal into a continuous policy impact cycle."
            )}
            eyebrowTone="accent"
            size="xl"
          />

          <div className="cycle-grid">
            {cycleSteps.map((step) => (
              <article key={`${step.number}-${step.title}`} className="cycle-step">
                <p className="cycle-step-number">{step.number}</p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
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
