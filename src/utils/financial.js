export const monthlyPayment = (principal, annualRate, years) => {
  if (annualRate === 0) return principal / (years * 12);
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * (r * (1 + r) ** n) / ((1 + r) ** n - 1);
};

export const amortizationSchedule = (principal, annualRate, years) => {
  const payment = monthlyPayment(principal, annualRate, years);
  const r = annualRate / 100 / 12;
  let balance = principal;
  const schedule = [];
  for (let month = 1; month <= years * 12; month++) {
    const interest = balance * r;
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({ month, payment, interest, principalPaid, balance });
  }
  return schedule;
};

export const compoundInterest = (principal, annualRate, timesPerYear, years) => {
  const r = annualRate / 100;
  return principal * (1 + r / timesPerYear) ** (timesPerYear * years);
};

export const simpleInterest = (principal, annualRate, years) =>
  principal * (annualRate / 100) * years;

export const tipAmount = (bill, tipPercent) => bill * (tipPercent / 100);
export const splitBill = (bill, tip, people) => (bill + tip) / people;

export const salesTax = (price, taxRate) => price * (taxRate / 100);
export const priceAfterTax = (price, taxRate) => price + salesTax(price, taxRate);

export const discountAmount = (price, discountPercent) => price * (discountPercent / 100);
export const priceAfterDiscount = (price, discountPercent) => price - discountAmount(price, discountPercent);

export const futureValue = (presentValue, annualRate, years, monthlyContribution = 0) => {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  const fvPV = presentValue * (1 + r) ** n;
  const fvPMT = r === 0 ? monthlyContribution * n :
    monthlyContribution * (((1 + r) ** n - 1) / r);
  return fvPV + fvPMT;
};
