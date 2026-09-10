import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  dark?: boolean;
}

export function IconCard({ icon: Icon, title, description, href, dark = false }: IconCardProps) {
  const content = (
    <article className={`icon-card ${dark ? "icon-card--dark" : ""}`}>
      <Icon className="icon-card-icon" aria-hidden="true" />
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );

  if (!href) return content;

  return (
    <Link href={href} className="card-link-wrap">
      {content}
    </Link>
  );
}

interface NumberedRowProps {
  index: string;
  title: string;
  description: string;
  dark?: boolean;
}

export function NumberedRow({ index, title, description, dark = false }: NumberedRowProps) {
  return (
    <article className={`numbered-row ${dark ? "numbered-row--dark" : ""}`}>
      <p className="numbered-row-index">{index}</p>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

interface StatItemProps {
  value: string;
  label: string;
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <article className="stat-item">
      <h3>{value}</h3>
      <p>{label}</p>
    </article>
  );
}

interface PublicationCardProps {
  image: string;
  tag: string;
  title: string;
  date: string;
  href: string;
}

export function PublicationCard({ image, tag, title, date, href }: PublicationCardProps) {
  return (
    <article className="publication-card">
      <div className="publication-card-image-wrap">
        <Image src={image} alt={title} fill className="publication-card-image" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="publication-card-content">
        <span className="chip chip--soft">{tag}</span>
        <Link href={href} className="publication-card-title-link">
          <h3>{title}</h3>
        </Link>
        <p className="publication-card-date">{date}</p>
      </div>
    </article>
  );
}

interface NewsFeatureCardProps {
  image: string;
  meta: string;
  title: string;
  excerpt: string;
  href: string;
}

export function NewsFeatureCard({ image, meta, title, excerpt, href }: NewsFeatureCardProps) {
  return (
    <article className="news-feature-card">
      <div className="news-feature-card-image-wrap">
        <Image src={image} alt={title} fill className="news-feature-card-image" sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="news-feature-card-content">
        <p className="news-feature-card-meta">{meta}</p>
        <Link href={href} className="news-feature-card-title-link">
          <h3>{title}</h3>
        </Link>
        <p className="news-feature-card-excerpt">{excerpt}</p>
      </div>
    </article>
  );
}

interface CompactCardProps {
  meta: string;
  title: string;
  description?: string;
  image?: string;
  href?: string;
  variant?: "feature" | "pathway";
}

export function CompactCard({ meta, title, description, image, href, variant = "feature" }: CompactCardProps) {
  const content = (
    <article className={`compact-card compact-card--${variant}`}>
      {image ? (
        <div className="compact-card-image-wrap">
          <Image src={image} alt={title} fill className="compact-card-image" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      ) : null}
      {meta ? <p className="compact-card-meta">{meta}</p> : null}
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
    </article>
  );

  if (!href) return content;

  return (
    <Link href={href} className="card-link-wrap">
      {content}
    </Link>
  );
}

interface RelatedLinkCardProps {
  meta: string;
  title: string;
  href: string;
  image?: string;
}

export function RelatedLinkCard({ meta, title, href, image }: RelatedLinkCardProps) {
  return (
    <Link href={href} className="card-link-wrap">
      <article className="related-link-card">
        {image ? (
          <div className="related-link-card-image-wrap">
            <Image src={image} alt={title} fill className="related-link-card-image" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        ) : null}
        <p className="related-link-card-meta">{meta}</p>
        <h3>{title}</h3>
      </article>
    </Link>
  );
}
