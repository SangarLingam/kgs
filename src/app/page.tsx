import { BrandLockup } from "./components/brand-lockup";
import { ContactForm } from "./components/contact-form";
import { SocialLinks } from "./components/page-chrome";

const solutions = [
  { number: "01", title: "Loans", text: "Explore personal or business loan options and learn about the next steps.", href: "/solutions#loans" },
  { number: "02", title: "Savings", text: "Learn about savings products and the terms set by each provider.", href: "/solutions#savings" },
  { number: "03", title: "Planning for the future", text: "Explore financial products that may help you plan for long-term goals.", href: "/solutions#future" },
  { number: "04", title: "Finance for businesses", text: "Tell us what your business needs, from everyday costs to future growth.", href: "/solutions#business" },
];

const steps = ["Get in touch", "Tell us what you need", "Explore possible options", "Share required details", "Get follow-up support"];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="KGS home"><BrandLockup /></a>
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#about">About</a><a href="#solutions">How we can help</a><a href="#journey">How it works</a><a href="/emi-calculator">EMI calculator</a><a href="#contact">Contact</a></nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation menu"><span className="menu-icon" aria-hidden="true"><span /><span /><span /></span></summary>
          <nav aria-label="Mobile navigation"><a href="#about">About</a><a href="#solutions">How we can help</a><a href="#journey">How it works</a><a href="/emi-calculator">EMI calculator</a><a href="#contact">Contact</a></nav>
        </details>
        <a className="button button-small" href="/apply">Apply for finance <span>→</span></a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> FINANCIAL HELP, MADE CLEAR</div>
          <h1>Financial solutions.<br /><em>Structured for growth.</em></h1>
          <p className="hero-lede">KGS helps people and businesses explore financial products from banks and other providers. We explain the process and help you take the next step.</p>
          <div className="hero-actions"><a className="button" href="/apply">Apply for finance <span>→</span></a><a className="text-link" href="#solutions">See how we can help <span>↓</span></a></div>
          <div className="hero-note"><span className="note-dot" /> Start with a question. We’ll explain what happens next.</div>
        </div>
        <aside className="hero-contact-card" id="contact" aria-labelledby="quick-contact-title"><div className="hero-form-head"><div className="section-label">QUICK CONTACT</div><h2 id="quick-contact-title">How can we help?</h2><p>Send us a message and our team will get back to you.</p></div><ContactForm compact /><p className="hero-apply-link">Looking for finance? <a href="/apply">Go to the finance form <span>→</span></a></p><SocialLinks /></aside>
        <div className="hero-bottom"><span>ANYTHING TO SOMETHING — WE MAKE IT HAPPEN</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="intro section-wrap" id="about">
        <div className="section-label">01 — WHO WE ARE</div>
        <div className="intro-content"><h2>Money choices should be<br /><em>easier to understand.</em></h2><div><p>KGS helps people and businesses explore financial products from banks and other providers, understand the process, and find out what to do next.</p><a className="under-link" href="#story">Meet KGS <span>→</span></a></div></div>
        <div className="home-values"><article><span>OUR VISION</span><p>To redefine finance for the common man by offering smart savings, accessible loans, and sustainable wealth-building solutions.</p></article><article><span>OUR MISSION</span><p>To make financial services more accessible, structured and understandable.</p></article></div>
      </section>

      <section className="solutions section-wrap" id="solutions">
        <div className="section-head"><div><div className="section-label">02 — HOW WE CAN HELP</div><h2>Find a place<br />to <em>start.</em></h2></div><p>Choose a topic to learn more. Not sure what you need? Send us a question and we’ll help point you in the right direction.</p></div>
        <div className="solution-grid">{solutions.map((item) => <a className="solution-card" href={item.href} key={item.number}><div className="card-top"><span>{item.number}</span><span className="arrow">→</span></div><h3>{item.title}</h3><p>{item.text}</p></a>)}</div>
      </section>

      <section className="process" id="journey">
        <div className="section-wrap process-inner"><div className="section-label">03 — HOW IT WORKS</div><div className="process-heading"><h2>Clear steps.<br /><em>Helpful support.</em></h2><p>Here’s what to expect when you contact KGS. We’ll explain the process before you decide what to do.</p></div><div className="steps">{steps.map((step, i) => <div className="step" key={step}><span className="step-number">0{i + 1}</span><span>{step}</span><p>{["Send a question or finance enquiry.", "We’ll ask about your needs.", "We’ll explain the options available to you.", "If you choose to continue, we’ll explain what’s needed.", "Our team will guide you through the next steps."][i]}</p></div>)}</div></div>
      </section>

      <section className="story section-wrap" id="story">
        <div className="section-label">04 — OUR JOURNEY</div><div className="story-layout"><div><h2>Growing step<br /><em>by step.</em></h2><p>KGS began by helping people explore savings and loans. Since then, we’ve expanded the services and systems we use to support customers.</p></div><div className="journey-timeline"><article className="journey-card"><span>2021</span><p>Krishi Financial Services began, focusing on everyday savings and loans.</p></article><article className="journey-card"><span>2022–23</span><p>Expanded products, strengthened documentation and improved customer support.</p></article><article className="journey-card"><span>2024–25</span><p>Upgraded operating systems and expanded digital financial distribution.</p></article><article className="journey-card"><span>2026</span><p>Krishi Global Solutions Pvt. Ltd. was incorporated and the KGS Corporate Platform launched.</p></article></div></div>
      </section>

      <section className="future future-launch"><div className="future-inner"><div className="section-label">THE NEXT CHAPTER</div><h2>More ways to<br /><em>connect online.</em></h2><p>We’re working on a digital service to make it easier to explore finance options. More details will be shared when it’s ready.</p><span className="coming"><i aria-hidden="true" /> COMING SOON</span></div><div className="launch-visual" aria-label="KGS digital services project coming soon"><div className="launch-orb" aria-hidden="true"/><div className="launch-visual-top"><span>KGS DIGITAL SERVICES</span><span className="launch-live"><i aria-hidden="true" /> IN PROGRESS</span></div><div className="launch-year launch-soon">Coming Soon</div><div className="launch-caption">A more connected way to move forward.</div><svg className="launch-route" viewBox="0 0 500 100" fill="none" aria-hidden="true"><defs><linearGradient id="launchGradient" x1="8" y1="82" x2="492" y2="14" gradientUnits="userSpaceOnUse"><stop stopColor="#00a7de"/><stop offset="1" stopColor="#b0d252"/></linearGradient></defs><path className="launch-route-base" d="M8 82C100 82 107 62 180 62S270 34 333 34 409 14 492 14"/><path className="launch-route-progress" d="M8 82C100 82 107 62 180 62S270 34 333 34 409 14 492 14"/><circle className="launch-node node-one" cx="180" cy="62" r="5"/><circle className="launch-node node-two" cx="333" cy="34" r="5"/><circle className="launch-node node-three" cx="492" cy="14" r="6"/></svg><div className="launch-milestones"><span>Built around you</span><span>Simple to explore</span><span>Coming soon</span></div></div></section>

      <section className="future homepage-finance-cta" id="finance"><div className="future-inner"><div className="section-label">NEED A LOAN OR BUSINESS FINANCE?</div><h2>Start your finance<br /><em>enquiry here.</em></h2><p>Tell us what you need. KGS will contact you to discuss possible next steps.</p></div><div className="homepage-finance-actions"><a className="button" href="/apply">Apply for finance <span>→</span></a><a className="button ghost" href="/emi-calculator">Estimate a monthly payment</a></div></section>

      <footer className="footer"><a className="brand footer-brand" href="#home" aria-label="KGS home"><BrandLockup /></a><p>Financial solutions.<br />Structured for growth.</p><div className="footer-links"><a href="#about">About KGS</a><a href="#solutions">How we can help</a><a href="/emi-calculator">EMI calculator</a><a href="#contact">Contact</a></div><div className="footer-office"><strong>Our Offices</strong><span><strong>Head Office</strong>Perundurai, Erode<br />Tamil Nadu, India<br /><a href="tel:+917339328577">+91 73393 28577</a></span><span><strong>Coimbatore Office</strong>G.N. Mills, Coimbatore - 641029<br />Tamil Nadu, India<br /><a href="tel:+917339328577">+91 73393 28577</a></span><a href="mailto:krishigobalsolution@gmail.com">krishigobalsolution@gmail.com</a></div><div className="legal">© 2026 Krishi Global Solutions Pvt. Ltd.<br /><span>Finance depends on the provider’s terms and your eligibility. An enquiry does not guarantee approval or payment.</span><br /><a href="/legal#privacy">Privacy</a> · <a href="/legal#terms">Terms</a> · <a href="/legal#disclaimer">Disclaimer</a></div></footer>
    </main>
  );
}
