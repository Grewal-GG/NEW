import { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';

const safeEval = (expr) => {
  const sanitized = expr
    .replace(/[^0-9+\-*/.()^%e]/g, '')
    .replace(/\^/g, '**');
  try {
    const result = Function('"use strict"; return (' + sanitized + ')')();
    if (!isFinite(result)) return 'Error';
    return parseFloat(result.toFixed(10));
  } catch {
    return 'Error';
  }
};

const SCI_BUTTONS = [
  ['sin', 'cos', 'tan', 'log', 'ln'],
  ['sin⁻¹', 'cos⁻¹', 'tan⁻¹', 'π', 'e'],
  ['x²', 'xʸ', '√', '∛', '1/x'],
  ['(', ')', 'AC', '⌫', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [deg, setDeg] = useState(true);
  const [justCalc, setJustCalc] = useState(false);

  const toRad = (x) => deg ? x * Math.PI / 180 : x;
  const fromRad = (x) => deg ? x * 180 / Math.PI : x;

  const appendToExpr = (val) => {
    setExpression(e => justCalc ? val : e + val);
    setJustCalc(false);
  };

  const applyFn = (fn) => {
    const current = parseFloat(display);
    let result;
    switch (fn) {
      case 'sin': result = Math.sin(toRad(current)); break;
      case 'cos': result = Math.cos(toRad(current)); break;
      case 'tan': result = Math.tan(toRad(current)); break;
      case 'sin⁻¹': result = fromRad(Math.asin(current)); break;
      case 'cos⁻¹': result = fromRad(Math.acos(current)); break;
      case 'tan⁻¹': result = fromRad(Math.atan(current)); break;
      case 'log': result = Math.log10(current); break;
      case 'ln': result = Math.log(current); break;
      case 'x²': result = current ** 2; break;
      case '√': result = Math.sqrt(current); break;
      case '∛': result = Math.cbrt(current); break;
      case '1/x': result = 1 / current; break;
      default: return;
    }
    result = parseFloat(result.toFixed(10));
    setDisplay(String(result));
    setExpression(String(result));
    setJustCalc(true);
  };

  const handleBtn = (btn) => {
    if (btn === 'AC') { setDisplay('0'); setExpression(''); setJustCalc(false); return; }
    if (btn === '⌫') {
      const e = expression.slice(0, -1) || '0';
      setExpression(e);
      setDisplay(e);
      return;
    }
    if (['sin', 'cos', 'tan', 'sin⁻¹', 'cos⁻¹', 'tan⁻¹', 'log', 'ln', 'x²', '√', '∛', '1/x'].includes(btn)) {
      applyFn(btn); return;
    }
    if (btn === 'π') { appendToExpr(String(Math.PI)); setDisplay(String(Math.PI)); return; }
    if (btn === 'e') { appendToExpr(String(Math.E)); setDisplay(String(Math.E)); return; }
    if (btn === 'xʸ') { appendToExpr('^'); setDisplay(display + '^'); return; }
    if (btn === '=') {
      const result = safeEval(expression);
      setDisplay(String(result));
      setExpression(String(result));
      setJustCalc(true);
      return;
    }
    const map = { '÷': '/', '×': '*', '−': '-' };
    const char = map[btn] || btn;
    appendToExpr(char);
    setDisplay(display + char);
  };

  const btnStyle = (btn) => {
    if (btn === '=') return 'bg-primary text-white hover:bg-primary-hover';
    if (['+', '−', '×', '÷'].includes(btn)) return 'bg-accent/20 text-accent hover:bg-accent/30';
    if (['AC', '⌫'].includes(btn)) return 'bg-surface text-on-surface-muted hover:bg-border';
    if (['sin', 'cos', 'tan', 'log', 'ln', 'sin⁻¹', 'cos⁻¹', 'tan⁻¹', 'x²', 'xʸ', '√', '∛', '1/x'].includes(btn))
      return 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-xs';
    if (['π', 'e', '(', ')'].includes(btn)) return 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100/80';
    return 'bg-elevated text-on-surface hover:bg-surface border border-border';
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Scientific Calculator" description="Advanced math functions: trigonometry, logarithms, powers and more." category="math">
        <div className="max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-on-surface-muted font-mono">{expression || '0'}</div>
            <button
              onClick={() => setDeg(d => !d)}
              className={`text-xs px-2 py-1 rounded-md font-medium transition-colors ${deg ? 'bg-primary/20 text-primary' : 'bg-surface text-on-surface-muted'}`}
            >
              {deg ? 'DEG' : 'RAD'}
            </button>
          </div>
          <div className="bg-surface rounded-2xl p-4 mb-3 text-right">
            <div className="font-mono text-3xl font-light text-on-surface overflow-hidden truncate">
              {display}
            </div>
          </div>
          <div className="space-y-1.5">
            {SCI_BUTTONS.map((row, ri) => (
              <div key={ri} className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${row.length === 4 ? 4 : row.length === 5 ? 5 : row.length === 3 ? 3 : 4}, 1fr)` }}>
                {row.map(btn => (
                  <motion.button
                    key={btn}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleBtn(btn)}
                    className={`rounded-xl py-3 font-semibold transition-all duration-150 ${btnStyle(btn)} ${btn === '0' && row.length === 3 ? 'col-span-2' : ''}`}
                  >
                    {btn}
                  </motion.button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
