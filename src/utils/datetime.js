export const calculateAge = (birthDateStr) => {
  const today = new Date();
  const birth = new Date(birthDateStr);
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
  return { years, months, days, totalDays };
};

export const dateDifference = (date1Str, date2Str) => {
  const d1 = new Date(date1Str), d2 = new Date(date2Str);
  const diffMs = Math.abs(d2 - d1);
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const months = Math.floor(totalDays / 30.4375);
  const years = Math.floor(totalDays / 365.25);
  return { totalDays, weeks, remainingDays, months, years };
};

export const daysUntil = (targetDateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDateStr);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
};

export const addTime = (h1, m1, s1, h2, m2, s2) => {
  const total = h1 * 3600 + m1 * 60 + s1 + h2 * 3600 + m2 * 60 + s2;
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    totalSeconds: total,
  };
};

export const subtractTime = (h1, m1, s1, h2, m2, s2) => {
  const total = Math.abs(h1 * 3600 + m1 * 60 + s1 - (h2 * 3600 + m2 * 60 + s2));
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    totalSeconds: total,
  };
};
