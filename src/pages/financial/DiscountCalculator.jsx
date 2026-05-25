import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import { discountAmount, priceAfterDiscount } from '../../utils/financial';

export default function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const p = parseFloat(price), d = parseFloat(discount);
  const show = !isNaN(p) && !isNaN(d) && p > 0;
  const saved = show ? discountAmount(p, d) : null;
  const final = show ? priceAfterDiscount(p, d) : null;

  return (
    <PageWrapper>
      <CalculatorLayout title="Discount Calculator" description="Calculate sale price and how much you save." category="financial">
        <div className="space-y-5">
          <InputField label="Original price" value={price} onChange={setPrice} unit="$" unitPosition="left" placeholder="Enter original price" />
          <InputField label="Discount" value={discount} onChange={setDiscount} unit="%" placeholder="e.g. 25" />
          <ResultCard show={show}>
            <ResultRow label="Sale price" value={final} prefix="$" decimals={2} highlight />
            <ResultRow label="You save" value={saved} prefix="$" decimals={2} />
            <ResultRow label="Original price" value={p} prefix="$" decimals={2} />
          </ResultCard>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
