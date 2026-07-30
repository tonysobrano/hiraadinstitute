import { CTASection } from "@/components/site/CTASection";
import { ButtonLink } from "@/components/site/ButtonLink";
import { JournalArchive } from "@/components/site/JournalArchive";
import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import type { Journal } from "@/lib/site/journals";
import type { ContentResolver } from "@/lib/site/types";

interface JournalsPageContentProps {
  c: ContentResolver;
  journals: Journal[];
}

export function JournalsPageContent({ c, journals }: JournalsPageContentProps) {
  return (
    <PageShell t={c.t}>
      <PageHero
        eyebrow={c.t("journals.hero.eyebrow", "JOURNALS")}
        title={c.t("journals.hero.title", "Research and policy journals")}
        description={c.t(
          "journals.hero.description",
          "Browse Hiraad Institute's research papers and policy briefs, grounded in evidence from the Somali Region and designed for practical public-policy use."
        )}
      />

      <section className="journal-submit-band">
        <div className="container journal-submit-band-inner">
          <div>
            <p className="eyebrow eyebrow--accent">FOR RESEARCHERS</p>
            <h2>Have research ready for review?</h2>
            <p>
              Submit an original research paper, policy brief, or journal article to Hiraad’s editorial team.
            </p>
          </div>
          <ButtonLink href="/journals/submit" label="Submit Your Research" variant="accent" />
        </div>
      </section>

      <section className="section section--surface journal-archive">
        <div className="container">
          <SectionIntro
            eyebrow={c.t("journals.archive.eyebrow", "LATEST JOURNALS")}
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
