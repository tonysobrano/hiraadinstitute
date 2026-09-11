"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = [
  "main section",
  ".icon-card",
  ".compact-card",
  ".info-card",
  ".service-card",
  ".approach-step",
  ".cycle-step",
  ".publication-card",
  ".related-link-card",
  ".meta-card",
  ".asset-card"
].join(", ");

export function SiteMotion() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector<HTMLElement>(".site-header");

    const handleScroll = () => {
      if (!header) return;
      header.classList.toggle("site-header--scrolled", window.scrollY > 6);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (prefersReducedMotion) {
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    revealNodes.forEach((node, index) => {
      node.classList.add("reveal-item");
      node.style.setProperty("--reveal-delay", `${(index % 8) * 40}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealNodes.forEach((node) => {
      const isAboveFold = node.getBoundingClientRect().top < window.innerHeight * 0.86;
      if (isAboveFold) {
        node.classList.add("is-visible");
        return;
      }
      observer.observe(node);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
