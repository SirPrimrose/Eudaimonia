const getProgressValue = (value, maxValue) =>
  maxValue === 0 ? 0 : (value / maxValue) * 100;

const getExponentialDecayValue = (value, yScaling, xScaling) =>
  yScaling * (1 - Math.E ** (-xScaling * value));

export { getProgressValue, getExponentialDecayValue };
