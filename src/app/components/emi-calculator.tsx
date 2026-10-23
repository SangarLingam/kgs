"use client";

import { useState } from "react";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function EmiCalculator() {
  const [amount, setAmount] = useState(500000);
  const [amountInput, setAmountInput] = useState("500000");
  const [annualRate, setAnnualRate] = useState(12);
  const [rateInput, setRateInput] = useState("12");
  const [years, setYears] = useState(3);
  const [yearsInput, setYearsInput] = useState("3");

  const months = years * 12;
  const monthlyRate = annualRate / 1200;
  const monthlyPayment = monthlyRate === 0
    ? amount / months
    : (amount * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = Math.max(0, totalPayment - amount);

  const setLoanAmount = (value: number) => {
    const next = Math.min(10000000, Math.max(10000, value));
    setAmount(next);
    setAmountInput(String(next));
  };

  const setInterestRate = (value: number) => {
    const next = Math.min(30, Math.max(0, value));
    setAnnualRate(next);
    setRateInput(String(next));
  };

  const setRepaymentYears = (value: number) => {
    const next = Math.min(30, Math.max(1, Math.round(value)));
    setYears(next);
    setYearsInput(String(next));
  };

  return <div className="emi-calculator">
    <div className="emi-controls">
      <div className="emi-control">
        <span className="emi-control-heading"><span>Loan amount</span><strong>{currency.format(amount)}</strong></span>
        <input aria-label="Loan amount in rupees" type="range" min="10000" max="10000000" step="10000" value={amount} onChange={(event) => setLoanAmount(Number(event.target.value))} />
        <input aria-label="Enter loan amount in rupees" type="number" min="10000" max="10000000" step="10000" value={amountInput} onChange={(event) => { const value = event.target.value; setAmountInput(value); const parsed = Number(value); if (value !== "" && parsed >= 10000 && parsed <= 10000000) setAmount(parsed); }} onBlur={() => setLoanAmount(Number(amountInput) || amount)} />
      </div>
      <div className="emi-control">
        <span className="emi-control-heading"><span>Interest rate per year</span><strong>{annualRate}%</strong></span>
        <input aria-label="Interest rate per year" type="range" min="0" max="30" step=".1" value={annualRate} onChange={(event) => setInterestRate(Number(event.target.value))} />
        <input aria-label="Enter interest rate per year" type="number" min="0" max="30" step=".1" value={rateInput} onChange={(event) => { const value = event.target.value; setRateInput(value); const parsed = Number(value); if (value !== "" && parsed >= 0 && parsed <= 30) setAnnualRate(parsed); }} onBlur={() => setInterestRate(Number(rateInput) || 0)} />
      </div>
      <div className="emi-control">
        <span className="emi-control-heading"><span>Repayment period</span><strong>{years} {years === 1 ? "year" : "years"}</strong></span>
        <input aria-label="Repayment period in years" type="range" min="1" max="30" step="1" value={years} onChange={(event) => setRepaymentYears(Number(event.target.value))} />
        <input aria-label="Enter repayment period in years" type="number" min="1" max="30" step="1" value={yearsInput} onChange={(event) => { const value = event.target.value; setYearsInput(value); const parsed = Number(value); if (value !== "" && Number.isInteger(parsed) && parsed >= 1 && parsed <= 30) setYears(parsed); }} onBlur={() => setRepaymentYears(Number(yearsInput) || years)} />
      </div>
    </div>
    <section className="emi-results" aria-label="Estimated loan payments" aria-live="polite">
      <span className="emi-result-label">ESTIMATED MONTHLY PAYMENT</span>
      <strong className="emi-monthly">{currency.format(monthlyPayment)}</strong>
      <div className="emi-summary"><div><span>Total interest</span><strong>{currency.format(totalInterest)}</strong></div><div><span>Total amount paid</span><strong>{currency.format(totalPayment)}</strong></div></div>
      <p>Change the amount, rate or repayment period to update this estimate. The lender sets the actual interest rate, fees, eligibility and repayment terms.</p>
    </section>
  </div>;
}
