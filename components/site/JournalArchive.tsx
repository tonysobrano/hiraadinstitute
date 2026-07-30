"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { useState } from "react";

import type { Journal, JournalKind } from "@/lib/site/journals";

interface JournalArchiveProps {
  journals: Journal[];
}

type JournalFilter = "All" | JournalKind;

const filters: JournalFilter[] = ["All", "Policy Brief", "Research Paper"];

export function JournalArchive({ journals }: JournalArchiveProps) {
  const [filter, setFilter] = useState<JournalFilter>("All");
  const visibleJournals = filter === "All" ? journals : journals.filter((journal) => journal.kind === filter);

  const years = Array.from(new Set(journals.map((journal) => journal.year))).sort((a, b) => b - a);

  return (
    <>
      <div className="journal-archive-toolbar">
        <div className="chip-row" aria-label="Filter journals by format">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip chip-button ${filter === item ? "chip--active" : "chip--bordered"}`}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item === "All" ? "All journals" : `${item}s`}
            </button>
          ))}
        </div>
        <p className="journal-result-count">
          {visibleJournals.length} {visibleJournals.length === 1 ? "document" : "documents"}
        </p>
      </div>

      <div className="journal-archive-layout">
        <div className="journal-grid">
          {visibleJournals.map((journal) => (
            <article className="journal-card" key={journal.slug}>
              <Link href={`/journals/${journal.slug}`} className="journal-card-cover-link" aria-label={`Read ${journal.title}`}>
                <div className="journal-card-cover-wrap">
                  <Image
                    src={journal.cover}
                    alt={`${journal.title} cover`}
                    fill
                    className="journal-card-cover"
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 30vw"
                  />
                </div>
              </Link>

              <div className="journal-card-content">
                <p className="journal-card-meta">
                  {journal.kind} <span aria-hidden="true">·</span> {journal.year}
                </p>
                <Link href={`/journals/${journal.slug}`} className="journal-card-title-link">
                  <h2>{journal.title}</h2>
                </Link>
                <p className="journal-card-subtitle">{journal.subtitle}</p>

                <div className="journal-card-actions">
                  <Link href={`/journals/${journal.slug}`} className="journal-card-read">
                    Read journal <ArrowUpRight aria-hidden="true" />
                  </Link>
                  <a href={journal.pdf} download className="journal-card-download">
                    <Download aria-hidden="true" />
                    <span>PDF</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="journal-year-panel" aria-label="Journal archive years">
          <p className="journal-year-heading">Year</p>
          {years.map((year) => (
            <div className="journal-year-row" key={year}>
              <span>{year}</span>
              <span>{journals.filter((journal) => journal.year === year).length}</span>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
