/* eslint-disable no-param-reassign */
import { toClockTime } from '../../shared/format';
import CalculatedValue from './calculatedValue';

// TODO: Allow these values to come from state and be configured
const SOULPOWER_BASE = 10;
const SOULPOWER_TIME_SCALING = 1.1;

const SOULPOWER_SCALING_FACTORS = {
  TIME: 'Time',
  OBJECTIVES: 'Objectives',
};

/**
 * Gets soulpower earned for given time alive. Every 15 seconds alive gives 10% more soulpower, with the base increased for each checkpoint reached
 * @param {*} time Time spent alive in ms
 * @returns Total soulpower earned
 */
const getSoulpowerFromGameTime = (time) =>
  SOULPOWER_TIME_SCALING ** (time / 15000);

const calculateSoulpower = (state) => {
  const calculatedValue = new CalculatedValue(SOULPOWER_BASE, 0);

  calculatedValue.addModifier(
    SOULPOWER_SCALING_FACTORS.TIME,
    toClockTime(state.gameTime),
    getSoulpowerFromGameTime(state.gameTime)
  );
  // TODO: Make story progress elements that add multipliers to soulpower
  /* calculatedValue.addModifier(
    SOULPOWER_SCALING_FACTORS.OBJECTIVES,
    -1,
    2 ** state.permLevel
  ); */

  return calculatedValue.toObj;
};

export {
  SOULPOWER_BASE,
  SOULPOWER_SCALING_FACTORS,
  calculateSoulpower,
  getSoulpowerFromGameTime,
};
