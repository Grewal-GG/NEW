// Conversion tables: each value = "how many of this unit per 1 base unit"
// e.g. LENGTH base = meter, meter: 1, foot: 3.28084 means 1m = 3.28084 ft

export const LENGTH = {
  label: 'Length',
  base: 'meter',
  units: {
    meter: { label: 'Meter (m)', factor: 1 },
    kilometer: { label: 'Kilometer (km)', factor: 0.001 },
    mile: { label: 'Mile (mi)', factor: 0.000621371 },
    foot: { label: 'Foot (ft)', factor: 3.28084 },
    inch: { label: 'Inch (in)', factor: 39.3701 },
    centimeter: { label: 'Centimeter (cm)', factor: 100 },
    millimeter: { label: 'Millimeter (mm)', factor: 1000 },
    yard: { label: 'Yard (yd)', factor: 1.09361 },
    nauticalMile: { label: 'Nautical Mile (nmi)', factor: 0.000539957 },
  },
};

export const WEIGHT = {
  label: 'Weight',
  base: 'kilogram',
  units: {
    kilogram: { label: 'Kilogram (kg)', factor: 1 },
    gram: { label: 'Gram (g)', factor: 1000 },
    milligram: { label: 'Milligram (mg)', factor: 1e6 },
    pound: { label: 'Pound (lb)', factor: 2.20462 },
    ounce: { label: 'Ounce (oz)', factor: 35.274 },
    stone: { label: 'Stone (st)', factor: 0.157473 },
    ton: { label: 'Metric Ton (t)', factor: 0.001 },
    usTon: { label: 'US Ton', factor: 0.00110231 },
  },
};

export const VOLUME = {
  label: 'Volume',
  base: 'liter',
  units: {
    liter: { label: 'Liter (L)', factor: 1 },
    milliliter: { label: 'Milliliter (mL)', factor: 1000 },
    gallon: { label: 'US Gallon (gal)', factor: 0.264172 },
    quart: { label: 'Quart (qt)', factor: 1.05669 },
    pint: { label: 'Pint (pt)', factor: 2.11338 },
    cup: { label: 'Cup', factor: 4.22675 },
    fluidOunce: { label: 'Fluid Ounce (fl oz)', factor: 33.814 },
    tablespoon: { label: 'Tablespoon (tbsp)', factor: 67.628 },
    teaspoon: { label: 'Teaspoon (tsp)', factor: 202.884 },
    cubicMeter: { label: 'Cubic Meter (m³)', factor: 0.001 },
    cubicInch: { label: 'Cubic Inch (in³)', factor: 61.0237 },
  },
};

export const AREA = {
  label: 'Area',
  base: 'squareMeter',
  units: {
    squareMeter: { label: 'Square Meter (m²)', factor: 1 },
    squareKilometer: { label: 'Square Kilometer (km²)', factor: 1e-6 },
    squareMile: { label: 'Square Mile (mi²)', factor: 3.861e-7 },
    squareFoot: { label: 'Square Foot (ft²)', factor: 10.7639 },
    squareInch: { label: 'Square Inch (in²)', factor: 1550 },
    squareYard: { label: 'Square Yard (yd²)', factor: 1.19599 },
    acre: { label: 'Acre', factor: 0.000247105 },
    hectare: { label: 'Hectare (ha)', factor: 0.0001 },
  },
};

export const SPEED = {
  label: 'Speed',
  base: 'meterPerSecond',
  units: {
    meterPerSecond: { label: 'Meter/Second (m/s)', factor: 1 },
    kilometerPerHour: { label: 'Kilometer/Hour (km/h)', factor: 3.6 },
    milePerHour: { label: 'Mile/Hour (mph)', factor: 2.23694 },
    knot: { label: 'Knot (kn)', factor: 1.94384 },
    footPerSecond: { label: 'Foot/Second (ft/s)', factor: 3.28084 },
  },
};

// Generic converter: value in fromUnit → value in toUnit
// factor = "units per base", so: value_in_base = value / from.factor; result = base * to.factor
export const convertUnit = (value, fromKey, toKey, table) => {
  const fromFactor = table.units[fromKey].factor;
  const toFactor = table.units[toKey].factor;
  const inBase = value / fromFactor;
  return inBase * toFactor;
};

// Temperature needs special handling (affine transforms, not multiplicative)
export const convertTemperature = (value, from, to) => {
  let celsius;
  if (from === 'celsius') celsius = value;
  else if (from === 'fahrenheit') celsius = (value - 32) * 5 / 9;
  else if (from === 'kelvin') celsius = value - 273.15;

  if (to === 'celsius') return celsius;
  if (to === 'fahrenheit') return celsius * 9 / 5 + 32;
  if (to === 'kelvin') return celsius + 273.15;
};

export const TEMPERATURE_UNITS = {
  celsius: 'Celsius (°C)',
  fahrenheit: 'Fahrenheit (°F)',
  kelvin: 'Kelvin (K)',
};
