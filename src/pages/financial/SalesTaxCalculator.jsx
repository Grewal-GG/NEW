import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import { salesTax, priceAfterTax } from '../../utils/financial';

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');

  const p = parseFloat(price), r = parseFloat(taxRate);
  const show = !isNaN(p) && !isNaN(r) && p > 0;
  const tax = show ? salesTax(p, r) : null;
  const total = show ? priceAfterTax(p, r) : null;

  return (
    <PageWrapper>
      <CalculatorLayout title="Sales Tax Calculator" description="Calculate sales tax amount and final price." category="financial">
        <div className="space-y-5">
          <InputField label="Price before tax" value={price} onChange={setPrice} unit="$" unitPosition="left" placeholder="Enter price" />
          <InputField label="Tax rate" value={taxRate} onChange={setTaxRate} unit="%" placeholder="e.g. 8.5" />
          <ResultCard show={show}>
            <ResultRow label="Tax amount" value={tax} prefix="$" decimals={2} highlight />
            <ResultRow label="Total price" value={total} prefix="$" decimals={2} />
            <ResultRow label="Pre-tax price" value={p} prefix="$" decimals={2} />
          </ResultCard>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
