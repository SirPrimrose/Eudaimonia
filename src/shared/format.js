import * as ADNotations from '@antimatter-dimensions/notations';

const scientific = new ADNotations.ScientificNotation();
const engineering = new ADNotations.EngineeringNotation();
const standard = new ADNotations.StandardNotation();

const formats = {
  SCIENTIFIC: 'SCI',
  ENGINEERING: 'ENG',
  STANDARD: 'STD',
};

const globalFormat = formats.ENGINEERING;

const toClockTime = (timeMs) => {
  if (timeMs < 60 * 60 * 1000) {
    return new Date(timeMs).toISOString().slice(14, 19);
  }
  return new Date(timeMs).toISOString().slice(11, 19);
};

const toGameNumber = (number) => {
  if (globalFormat === formats.SCIENTIFIC) {
    return scientific.format(number, 2, 2);
  }
  if (globalFormat === formats.ENGINEERING) {
    return engineering.format(number, 2, 2);
  }
  return standard.format(number, 2, 2);
};

export { toClockTime, toGameNumber };