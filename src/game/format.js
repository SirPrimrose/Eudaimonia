import prettyMilliseconds from 'pretty-ms';

const scientific = new Intl.NumberFormat('en-US', {
  notation: 'scientific',
  maximumSignificantDigits: 3,
});
const standard = new Intl.NumberFormat('en-US', {
  notation: 'standard',
  maximumSignificantDigits: 3,
});
const engineering = new Intl.NumberFormat('en-US', {
  notation: 'engineering',
  maximumSignificantDigits: 3,
});

const formats = {
  SCIENTIFIC: 'SCI',
  ENGINEERING: 'ENG',
  STANDARD: 'STD',
};

const globalFormat = formats.ENGINEERING;

const toTimeLength = (timeMs) => prettyMilliseconds(timeMs);

const toClockTime = (timeMs) => {
  if (timeMs < 60 * 60 * 1000) {
    return new Date(timeMs).toISOString().slice(14, 19);
  }
  return new Date(timeMs).toISOString().slice(11, 19);
};

const toGameNumber = (number) => {
  if (number < 1000) {
    return standard.format(number);
  }
  if (globalFormat === formats.SCIENTIFIC) {
    return scientific.format(number);
  }
  if (globalFormat === formats.ENGINEERING) {
    return engineering.format(number);
  }
  return standard.format(number);
};

export { toTimeLength, toClockTime, toGameNumber };
