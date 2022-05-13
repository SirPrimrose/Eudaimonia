const getProgressValue = (value, maxValue) => (value / maxValue) * 100;

const getExponentialDecayValue = (value, yScaling, xScaling) =>
  yScaling * (1 - Math.E ** (-xScaling * value));

export { getProgressValue, getExponentialDecayValue };
