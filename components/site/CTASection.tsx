import { ButtonLink } from "@/components/site/ButtonLink";
import { NewsletterSignupButton } from "@/components/site/NewsletterSignupButton";

interface CTASectionProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
}: CTASectionProps) {
  return (
    <section className="cta-section" id="newsletter">
      <div className="container cta-section-inner">
        <h2>{title}</h2>
        <p>{description}</p>

        <div className="cta-actions">
          <ButtonLink href={primaryHref} label={primaryLabel} variant="primary" />
          <NewsletterSignupButton label={secondaryLabel} />
        </div>
      </div>
    </section>
  );
}
