export const percentageOf = (percent, total) => (percent / 100) * total;
export const percentageWhat = (part, total) => (part / total) * 100;
export const percentageChange = (from, to) => ((to - from) / from) * 100;

export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

export const addFractions = (n1, d1, n2, d2) => {
  const num = n1 * d2 + n2 * d1;
  const den = d1 * d2;
  const g = gcd(Math.abs(num), Math.abs(den));
  return { numerator: num / g, denominator: den / g };
};
export const subtractFractions = (n1, d1, n2, d2) => addFractions(n1, d1, -n2, d2);
export const multiplyFractions = (n1, d1, n2, d2) => {
  const num = n1 * n2, den = d1 * d2;
  const g = gcd(Math.abs(num), Math.abs(den));
  return { numerator: num / g, denominator: den / g };
};
export const divideFractions = (n1, d1, n2, d2) => multiplyFractions(n1, d1, d2, n2);

export const triangleArea = (base, height) => 0.5 * base * height;
export const triangleAreaHeron = (a, b, c) => {
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
};
export const triangleHypotenuse = (a, b) => Math.sqrt(a ** 2 + b ** 2);
export const triangleSideFromAngles = (a, b, angleC_deg) => {
  const C = (angleC_deg * Math.PI) / 180;
  return Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(C));
};
export const triangleAngleFromSides = (a, b, c) => {
  const cosC = (a ** 2 + b ** 2 - c ** 2) / (2 * a * b);
  return (Math.acos(Math.max(-1, Math.min(1, cosC))) * 180) / Math.PI;
};

export const arithmeticMean = (arr) => arr.reduce((s, x) => s + x, 0) / arr.length;
export const variance = (arr, population = false) => {
  const m = arithmeticMean(arr);
  const squaredDiffs = arr.map(x => (x - m) ** 2);
  const divisor = population ? arr.length : arr.length - 1;
  return squaredDiffs.reduce((s, x) => s + x, 0) / divisor;
};
export const stdDev = (arr, population = false) => Math.sqrt(variance(arr, population));

export const logBase = (value, base) => Math.log(value) / Math.log(base);

export const nthRoot = (value, n) => Math.pow(value, 1 / n);
