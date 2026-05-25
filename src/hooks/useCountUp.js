import { useEffect, useRef, useState } from 'react';

export function useCountUp(targetValue, { duration = 900, decimals = 2 } = {}) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef();
  const startRef = useRef(null);
  const startValueRef = useRef(0);

  useEffect(() => {
    if (targetValue === null || targetValue === undefined || isNaN(targetValue)) return;
    cancelAnimationFrame(frameRef.current);
    startValueRef.current = display;
    startRef.current = null;

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValueRef.current + (targetValue - startValueRef.current) * eased;
      setDisplay(current);
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [targetValue]);

  if (targetValue === null || targetValue === undefined || isNaN(targetValue)) return '—';
  return Number(display).toFixed(decimals);
}
