"use client";

import { useEffect, useState } from "react";
import { BrandLockup } from "./brand-lockup";

export function SocialLinks() {
  const whatsapp = "https://api.whatsapp.com/send?phone=917339328577";
  const instagram = "https://www.instagram.com/krishiglobalsolutions/";
  return <div className="social-links" aria-label="Social media">
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp KGS" title="Chat with KGS on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.3-4.5a8.4 8.4 0 1 1 15.7-4.2Z"/><path d="M9 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4-.1.6.6 1 1.5 1.8 2.5 2.3.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5 0 .3-.2 1.1-.7 1.5-.5.5-1.3.7-2 .5-1-.2-2.3-.8-3.7-2-1.7-1.5-2.7-3.3-3-4.3-.3-.9 0-1.5.4-1.9Z"/></svg></a>
    <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram KGS" title="Visit KGS on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.7" cy="6.7" r="1"/></svg></a>
  </div>;
}

const links = [
  ["/", "Home"],
  ["/about", "About KGS"],
  ["/solutions", "How we can help"],
  ["/emi-calculator", "EMI calculator"],
  ["/contact", "Contact"],
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <header className={`site-header${scrolled ? " scrolled" : ""}`}>
    <a className="brand" href="/" aria-label="KGS home"><BrandLockup /></a>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav>
    <a className="button button-small" href="/apply">Apply for finance <span>→</span></a>
    <details className="mobile-nav">
      <summary aria-label="Open navigation menu"><span className="menu-icon" aria-hidden="true"><span /><span /><span /></span></summary>
      <nav aria-label="Mobile navigation">{links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}<a href="/apply">Apply for finance</a></nav>
    </details>
  </header>;
}

export function Footer() {
  return <footer className="footer">
    <a className="brand footer-brand" href="/" aria-label="KGS home"><BrandLockup /></a>
    <p>Financial solutions.<br />Structured for growth.</p>
    <div className="footer-links"><a href="/about">About KGS</a><a href="/solutions">How we can help</a><a href="/emi-calculator">EMI calculator</a><a href="/apply">Apply for finance</a><a href="/contact">Contact</a></div>
    <div className="footer-office"><strong>Our Offices</strong><span>Head Office<br />Perundurai, Erode<br />Tamil Nadu, India<br /><a href="tel:+917339328577">+91 73393 28577</a></span><span>Coimbatore Office<br />G.N. Mills, Coimbatore - 641029<br />Tamil Nadu, India<br /><a href="tel:+917339328577">+91 73393 28577</a></span><a href="mailto:krishigobalsolution@gmail.com">krishigobalsolution@gmail.com</a></div>
    <div className="legal">© 2026 Krishi Global Solutions Pvt. Ltd.<br /><span>Finance depends on the provider’s terms and your eligibility. An enquiry does not guarantee approval or payment.</span><br /><a href="/legal#privacy">Privacy</a> · <a href="/legal#terms">Terms</a> · <a href="/legal#disclaimer">Disclaimer</a></div>
  </footer>;
}

export function Interior({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro: string; children: React.ReactNode }) {
  return <><Header /><main className="interior"><section className="interior-hero"><div className="section-label">{eyebrow}</div><h1>{title}</h1><p>{intro}</p></section>{children}</main><Footer /></>;
}
