import { Interior } from "../components/page-chrome";

const items = [
  ["loans", "Loans", "Learn about personal and business loan options and what you may need to apply."],
  ["savings", "Savings", "Learn about savings products and the conditions set by each provider."],
  ["future", "Planning for the future", "Explore financial products that may help with your longer-term goals."],
  ["partners", "Financial products from partners", "KGS works with banks and other providers to connect customers with financial products."],
  ["business", "Finance for businesses", "Ask about finance for day-to-day costs, business needs or growth plans."],
];

export const metadata = { title: "Financial solutions | Krishi Global Solutions", description: "Explore financial topics and learn how KGS can help explain options and connect you with providers." };

export default function SolutionsPage() {
  return <Interior eyebrow="HOW WE CAN HELP" title={<>Explore your options.<br /><em>Start with a question.</em></>} intro="Tell us what you’re looking for. KGS can help explain the process and connect you with relevant providers. Available products and terms depend on the provider.">
    <section className="interior-section solution-list">{items.map(([id, title, description], i) => <article id={id} key={id}><span>0{i + 1}</span><div><h2>{title}</h2><p>{description}</p></div></article>)}</section>
    <section className="interior-section"><div className="section-label">WHO PROVIDES THESE PRODUCTS?</div><p className="interior-copy">Banks, non-bank lenders, financial institutions, advisers and business partners.</p><p className="fine-print">Each provider sets its own products, terms and eligibility requirements. Ask us if you would like help understanding the next steps.</p></section>
    <section className="interior-section solution-cta"><div><div className="section-label">READY TO TAKE THE NEXT STEP?</div><h2>Ask us a question.<br /><em>We’ll help you get started.</em></h2></div><div className="solution-cta-actions"><a className="button" href="/apply">Ask about finance <span>→</span></a><a className="button ghost" href="/emi-calculator">Estimate a monthly payment <span>→</span></a></div></section>
  </Interior>;
}
