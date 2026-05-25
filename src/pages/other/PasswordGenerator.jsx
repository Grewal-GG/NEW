import { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../../components/layout/PageWrapper';
import CalculatorLayout from '../../components/calculator/CalculatorLayout';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';

const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.?',
};

const generatePassword = (length, options) => {
  let pool = '';
  if (options.uppercase) pool += CHARS.uppercase;
  if (options.lowercase) pool += CHARS.lowercase;
  if (options.numbers) pool += CHARS.numbers;
  if (options.symbols) pool += CHARS.symbols;
  if (!pool) return '';
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, x => pool[x % pool.length]).join('');
};

const strength = (pwd, options) => {
  const opts = Object.values(options).filter(Boolean).length;
  if (pwd.length < 8 || opts < 2) return { label: 'Weak', color: 'bg-red-500', width: '25%' };
  if (pwd.length < 12 || opts < 3) return { label: 'Fair', color: 'bg-yellow-500', width: '50%' };
  if (pwd.length < 16) return { label: 'Strong', color: 'bg-blue-500', width: '75%' };
  return { label: 'Very Strong', color: 'bg-green-500', width: '100%' };
};

export default function PasswordGenerator() {
  const [length, setLength] = useState('16');
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: false });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const pwd = generatePassword(parseInt(length) || 16, options);
    setPassword(pwd);
    setCopied(false);
  };

  const copy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const str = password ? strength(password, options) : null;

  return (
    <PageWrapper>
      <CalculatorLayout title="Password Generator" description="Generate strong, cryptographically secure random passwords." category="other">
        <div className="space-y-5">
          <InputField label="Password length" value={length} onChange={setLength} min="4" max="128" />
          <div>
            <span className="text-sm font-medium text-on-surface-muted block mb-3">Character types</span>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries({ uppercase: 'Uppercase (A-Z)', lowercase: 'Lowercase (a-z)', numbers: 'Numbers (0-9)', symbols: 'Symbols (!@#$)' }).map(([key, label]) => (
                <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={options[key]}
                    onChange={e => setOptions(o => ({ ...o, [key]: e.target.checked }))}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm text-on-surface group-hover:text-primary transition-colors">{label}</span>
                </label>
              ))}
            </div>
          </div>
          <Button onClick={generate} className="w-full">Generate password</Button>

          {password && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="result-card"
            >
              <div className="flex items-center gap-2 mb-3">
                <code className="flex-1 font-mono text-lg text-primary break-all">{password}</code>
                <button
                  onClick={copy}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              {str && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-muted">Strength</span>
                    <span className="font-medium text-on-surface">{str.label}</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${str.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: str.width }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </CalculatorLayout>
    </PageWrapper>
  );
}
