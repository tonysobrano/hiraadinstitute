"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/site/ButtonLink";
import { LogoMark } from "@/components/site/LogoMark";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Journals", href: "/journals" },
  { label: "News & Events", href: "/news-events" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab" && mobileNavRef.current) {
        const focusableItems = Array.from(
          mobileNavRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
        );
        const firstItem = focusableItems[0];
        const lastItem = focusableItems[focusableItems.length - 1];

        if (event.shiftKey && document.activeElement === firstItem) {
          event.preventDefault();
          lastItem?.focus();
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          event.preventDefault();
          firstItem?.focus();
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileMenuOpen(false);
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  const isActive = (href: string) => {
    if (href === "/news-events" && (pathname?.startsWith("/news/") || pathname?.startsWith("/events/"))) {
      return true;
    }

    return pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));
  };

  return (
    <>
      <header className="site-header">
        <div className="container site-header-inner">
          <LogoMark />

          <nav className="site-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`site-nav-link ${isActive(item.href) ? "is-active" : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header-cta">
            <ButtonLink href="/contact" label="Get Involved" variant="dark" />
          </div>

          <button
            ref={menuButtonRef}
            className={`site-header-menu ${mobileMenuOpen ? "is-open" : ""}`}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="site-mobile-navigation"
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`site-mobile-backdrop ${mobileMenuOpen ? "is-open" : ""}`} onClick={() => setMobileMenuOpen(false)} />

      <div
        ref={mobileNavRef}
        id="site-mobile-navigation"
        className={`site-mobile-nav ${mobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
        aria-modal="true"
        aria-label="Navigation menu"
        role="dialog"
      >
        <div className="site-mobile-nav-inner">
          <div className="site-mobile-nav-top">
            <LogoMark />
            <button
              ref={closeButtonRef}
              className="site-mobile-close"
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span aria-hidden>×</span>
            </button>
          </div>

          <nav className="site-mobile-nav-links" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`site-mobile-nav-link ${isActive(item.href) ? "is-active" : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-mobile-nav-bottom">
            <ButtonLink href="/contact" label="Get Involved" variant="dark" className="site-mobile-nav-cta" />
          </div>
        </div>
      </div>
    </>
  );
}
