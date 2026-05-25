export const formatCurrency = (value, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(value);

export const formatNumber = (value, decimals = 2) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(value);

export const formatCompact = (value) =>
  new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(value);

export const formatPercent = (value, decimals = 2) =>
  `${Number(value).toFixed(decimals)}%`;

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(
    date instanceof Date ? date : new Date(date)
  );

export const formatDateShort = (date) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
    date instanceof Date ? date : new Date(date)
  );

export const roundTo = (value, decimals = 4) =>
  Math.round(value * 10 ** decimals) / 10 ** decimals;
