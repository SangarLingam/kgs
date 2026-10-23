import { Interior } from "../components/page-chrome";
import { EmiCalculator } from "../components/emi-calculator";

export const metadata = {
  title: "EMI Calculator | KGS",
  description: "Estimate your monthly loan payment using the KGS EMI calculator.",
};

export default function EmiCalculatorPage() {
  return <Interior eyebrow="EMI CALCULATOR" title={<>Estimate your<br /><em>monthly payment.</em></>} intro="Adjust the loan amount, interest rate and repayment period to see an estimated monthly payment.">
    <section className="interior-section emi-section"><EmiCalculator /></section>
  </Interior>;
}
