import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/site/PageShell";
import { getJournalBySlug, journals } from "@/lib/site/journals";

interface JournalPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return journals.map((journal) => ({ slug: journal.slug }));
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const journal = getJournalBySlug(slug);

  if (!journal) {
    return { title: "Journal | Hiraad Institute" };
  }

  return {
    title: `${journal.title} | Hiraad Institute`,
    description: journal.description
  };
}

export default async function JournalPage({ params }: JournalPageProps) {
  const { slug } = await params;
  const journal = getJournalBySlug(slug);

  if (!journal) {
    notFound();
  }

  return (
    <PageShell>
      <section className="journal-reader-hero">
        <div className="container">
          <Link href="/journals" className="journal-reader-back">
            <ArrowLeft aria-hidden="true" />
            All journals
          </Link>

          <div className="journal-reader-summary">
            <div className="journal-reader-cover-wrap">
              <Image
                src={journal.cover}
                alt={`${journal.title} cover`}
                fill
                priority
                className="journal-reader-cover"
                sizes="(max-width: 700px) 44vw, 240px"
              />
            </div>

            <div className="journal-reader-copy">
              <p className="eyebrow eyebrow--accent">
                {journal.kind} · {journal.year}
              </p>
              <h1>{journal.title}</h1>
              <p>{journal.subtitle}</p>
              <p className="journal-reader-description">{journal.description}</p>
              <div className="journal-reader-actions">
                <a className="btn btn-primary" href={journal.pdf} download>
                  <Download aria-hidden="true" />
                  Download PDF
                </a>
                <a className="btn btn-outline-light" href={journal.pdf} target="_blank" rel="noreferrer">
                  <ExternalLink aria-hidden="true" />
                  Open full screen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--muted journal-reader-section">
        <div className="container">
          <div className="journal-reader-heading">
            <div>
              <p className="eyebrow">DOCUMENT READER</p>
              <h2>Read online</h2>
            </div>
            <p>
              {journal.pages} pages <span aria-hidden="true">·</span> PDF
            </p>
          </div>

          <iframe className="journal-reader-frame" src={`${journal.pdf}#view=FitH`} title={`${journal.title} PDF`} />
          <p className="journal-reader-fallback">
            If the reader does not load,{" "}
            <a href={journal.pdf} target="_blank" rel="noreferrer">
              open the PDF in a new tab
            </a>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
