export const bmiValue = (weightKg, heightM) => weightKg / heightM ** 2;
export const bmiCategory = (bmi) => {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
  if (bmi < 25) return { label: 'Normal weight', color: 'text-green-500' };
  if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500' };
  return { label: 'Obese', color: 'text-red-500' };
};
export const lbsToKg = (lbs) => lbs * 0.453592;
export const inchesToM = (inches) => inches * 0.0254;
export const cmToM = (cm) => cm / 100;
export const kgToLbs = (kg) => kg / 0.453592;

export const bmrMale = (weightKg, heightCm, ageYears) =>
  88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageYears;
export const bmrFemale = (weightKg, heightCm, ageYears) =>
  447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * ageYears;

export const ACTIVITY_MULTIPLIERS = {
  sedentary: { value: 1.2, label: 'Sedentary (little or no exercise)' },
  light: { value: 1.375, label: 'Light (1-3 days/week)' },
  moderate: { value: 1.55, label: 'Moderate (3-5 days/week)' },
  active: { value: 1.725, label: 'Active (6-7 days/week)' },
  veryActive: { value: 1.9, label: 'Very Active (twice/day, hard workouts)' },
};
export const tdee = (bmr, activityKey) => bmr * ACTIVITY_MULTIPLIERS[activityKey].value;

export const bodyFatMale = (waistCm, neckCm, heightCm) =>
  86.010 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(heightCm) + 36.76;
export const bodyFatFemale = (waistCm, hipCm, neckCm, heightCm) =>
  163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(heightCm) - 78.387;

export const bodyFatCategory = (pct, gender) => {
  if (gender === 'male') {
    if (pct < 6) return 'Essential fat';
    if (pct < 14) return 'Athletic';
    if (pct < 18) return 'Fitness';
    if (pct < 25) return 'Average';
    return 'Obese';
  } else {
    if (pct < 14) return 'Essential fat';
    if (pct < 21) return 'Athletic';
    if (pct < 25) return 'Fitness';
    if (pct < 32) return 'Average';
    return 'Obese';
  }
};

export const idealWeightMale = (heightInches) => 50 + 2.3 * (heightInches - 60);
export const idealWeightFemale = (heightInches) => 45.5 + 2.3 * (heightInches - 60);

export const dueDate = (lmpDate) => {
  const d = new Date(lmpDate);
  d.setDate(d.getDate() + 280);
  return d;
};

export const ovulationDate = (lmpDate, cycleLength = 28) => {
  const d = new Date(lmpDate);
  d.setDate(d.getDate() + cycleLength - 14);
  return d;
};
