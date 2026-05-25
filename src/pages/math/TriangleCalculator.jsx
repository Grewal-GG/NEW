import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import ResultCard from '../../components/ui/ResultCard';
import ResultRow from '../../components/ui/ResultRow';
import FormulaInfo from '../../components/calculator/FormulaInfo';
import { triangleArea, triangleAreaHeron, triangleHypotenuse, triangleAngleFromSides } from '../../utils/math';

export default function TriangleCalculator() {
  const [a, setA] = useState(''); const [b, setB] = useState(''); const [c, setC] = useState('');
  const [base, setBase] = useState(''); const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const calcFromSides = () => {
    const sa = parseFloat(a), sb = parseFloat(b), sc = parseFloat(c);
    if ([sa, sb, sc].some(isNaN) || sa <= 0 || sb <= 0 || sc <= 0) return;
    if (sa + sb <= sc || sa + sc <= sb || sb + sc <= sa) { alert('Invalid triangle: sides violate triangle inequality.'); return; }
    const area = triangleAreaHeron(sa, sb, sc);
    const perimeter = sa + sb + sc;
    const A = triangleAngleFromSides(sb, sc, sa);
    const B = triangleAngleFromSides(sa, sc, sb);
    const C = 180 - A - B;
    setResult({ area, perimeter, A, B, C });
  };

  const calcFromBaseHeight = () => {
    const bv = parseFloat(base), hv = parseFloat(height);
    if (isNaN(bv) || isNaN(hv)) return;
    setResult({ area: triangleArea(bv, hv), perimeter: null, A: null, B: null, C: null });
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Triangle Calculator" description="Calculate area, perimeter and angles of any triangle." category="math">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-on-surface mb-3">From three sides (SSS)</h3>
            <div className="grid grid-cols-3 gap-3">
              <InputField label="Side a" value={a} onChange={setA} placeholder="0" />
              <InputField label="Side b" value={b} onChange={setB} placeholder="0" />
              <InputField label="Side c" value={c} onChange={setC} placeholder="0" />
            </div>
            <Button onClick={calcFromSides} className="w-full mt-3">Calculate from sides</Button>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-on-surface mb-3">From base and height</h3>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Base" value={base} onChange={setBase} placeholder="0" />
              <InputField label="Height" value={height} onChange={setHeight} placeholder="0" />
            </div>
            <Button onClick={calcFromBaseHeight} className="w-full mt-3" variant="secondary">Calculate from base & height</Button>
          </div>

          <ResultCard show={result !== null}>
            {result?.area !== null && <ResultRow label="Area" value={result?.area} decimals={4} highlight />}
            {result?.perimeter !== null && <ResultRow label="Perimeter" value={result?.perimeter} decimals={4} />}
            {result?.A !== null && <ResultRow label="Angle A" value={result?.A} decimals={2} suffix="°" />}
            {result?.B !== null && <ResultRow label="Angle B" value={result?.B} decimals={2} suffix="°" />}
            {result?.C !== null && <ResultRow label="Angle C" value={result?.C} decimals={2} suffix="°" />}
          </ResultCard>
        </div>
        <FormulaInfo>
          <ul className="space-y-1 list-disc pl-4">
            <li>Area (base×height): ½ × base × height</li>
            <li>Area (Heron's): √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2</li>
            <li>Angles: Law of Cosines — cos(C) = (a²+b²-c²)/(2ab)</li>
          </ul>
        </FormulaInfo>
      </CalculatorLayout>
    </PageWrapper>
  );
}
