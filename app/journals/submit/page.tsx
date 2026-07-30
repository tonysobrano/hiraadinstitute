import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/site/PageHero";
import { PageShell } from "@/components/site/PageShell";
import { ResearchSubmissionForm } from "@/components/site/ResearchSubmissionForm";
import { getContentResolver } from "@/lib/site/content";

export const metadata: Metadata = {
  title: "Submit Research | Hiraad Institute",
  description: "Submit an original research paper, policy brief, or journal article to Hiraad Institute."
};

export default async function SubmitResearchPage() {
  const c = await getContentResolver("publications");

  return (
    <PageShell t={c.t}>
      <PageHero
        eyebrow="CONTRIBUTE TO HIRAAD"
        title="Submit your research"
        description="Share rigorous, policy-relevant research for consideration by Hiraad Institute’s editorial team."
        size="compact"
      />

      <section className="section section--surface research-submission-page">
        <div className="container">
          <Link className="research-submission-back" href="/journals">
            <ArrowLeft aria-hidden="true" />
            Back to journals
          </Link>

          <div className="research-submission-layout">
            <aside className="research-submission-sidebar">
              <p className="eyebrow eyebrow--accent">BEFORE YOU SUBMIT</p>
              <h2>What happens next</h2>
              <p>
                Submissions are screened for relevance, originality, research quality, and alignment with Hiraad’s
                policy mission.
              </p>

              <ol className="research-review-steps">
                <li>
                  <span>1</span>
                  <div>
                    <strong>Editorial screening</strong>
                    <p>The team checks completeness and fit.</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <strong>Research review</strong>
                    <p>Suitable papers may be sent for expert review.</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <strong>Decision and next steps</strong>
                    <p>The corresponding author receives an update by email.</p>
                  </div>
                </li>
              </ol>

              <div className="research-submission-notes">
                <div>
                  <ShieldCheck aria-hidden="true" />
                  <span>Your manuscript is stored for editorial review.</span>
                </div>
                <div>
                  <Clock3 aria-hidden="true" />
                  <span>Keep the reference number shown after submission.</span>
                </div>
                <div>
                  <CheckCircle2 aria-hidden="true" />
                  <span>Submitting does not guarantee publication.</span>
                </div>
              </div>
            </aside>

            <div className="research-submission-panel">
              <div className="research-submission-panel-heading">
                <p className="eyebrow">MANUSCRIPT SUBMISSION</p>
                <h2>Research and author information</h2>
                <p>Complete the form below and attach the version you would like the editorial team to review.</p>
              </div>
              <ResearchSubmissionForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
