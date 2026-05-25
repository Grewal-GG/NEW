import { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';

const BUTTONS = [
  ['AC', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [newInput, setNewInput] = useState(true);

  const handleDigit = (d) => {
    if (newInput) {
      setDisplay(d === '.' ? '0.' : d);
      setNewInput(false);
    } else {
      if (d === '.' && display.includes('.')) return;
      setDisplay(display === '0' && d !== '.' ? d : display + d);
    }
  };

  const calculate = (a, b, operator) => {
    switch (operator) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleOperator = (operator) => {
    const current = parseFloat(display);
    if (op && !newInput) {
      const result = calculate(prev, current, op);
      setDisplay(String(parseFloat(result.toFixed(10))));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setOp(operator);
    setNewInput(true);
  };

  const handleEquals = () => {
    if (!op || newInput) return;
    const current = parseFloat(display);
    const result = calculate(prev, current, op);
    setDisplay(typeof result === 'number' ? String(parseFloat(result.toFixed(10))) : result);
    setPrev(null);
    setOp(null);
    setNewInput(true);
  };

  const handlePress = (btn) => {
    if (btn === 'AC') { setDisplay('0'); setPrev(null); setOp(null); setNewInput(true); return; }
    if (btn === '±') { setDisplay(String(parseFloat(display) * -1)); return; }
    if (btn === '%') { setDisplay(String(parseFloat(display) / 100)); return; }
    if (['+', '−', '×', '÷'].includes(btn)) { handleOperator(btn); return; }
    if (btn === '=') { handleEquals(); return; }
    handleDigit(btn);
  };

  const btnStyle = (btn) => {
    if (btn === '=' ) return 'bg-primary text-white hover:bg-primary-hover col-span-1';
    if (['+', '−', '×', '÷'].includes(btn)) return 'bg-accent/20 text-accent hover:bg-accent/30 font-bold';
    if (['AC', '±', '%'].includes(btn)) return 'bg-surface text-on-surface-muted hover:bg-border';
    return 'bg-elevated text-on-surface hover:bg-surface border border-border';
  };

  return (
    <PageWrapper>
      <CalculatorLayout title="Basic Calculator" description="Perform standard arithmetic operations." category="math">
        <div className="max-w-xs mx-auto">
          <div className="bg-surface rounded-2xl p-4 mb-4 text-right">
            {op && <div className="text-on-surface-muted text-sm mb-1">{prev} {op}</div>}
            <div className="font-mono text-4xl font-light text-on-surface overflow-hidden truncate">
              {display}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {BUTTONS.map((row, ri) =>
              row.map((btn, bi) => (
                <motion.button
                  key={`${ri}-${bi}`}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePress(btn)}
                  className={`rounded-xl py-4 text-lg font-semibold transition-all duration-150 ${btnStyle(btn)} ${btn === '0' ? 'col-span-2' : ''}`}
                >
                  {btn}
                </motion.button>
              ))
            )}
          </div>
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
