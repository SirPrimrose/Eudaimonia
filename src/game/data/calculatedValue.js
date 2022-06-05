import _ from 'lodash';

export default class CalculatedValue {
  #baseValue;

  #precision;

  static baseObject = (baseValue = 1) => ({
    baseValue,
    value: baseValue,
    modifiers: [],
  });

  constructor(baseValue, precision = -1) {
    this.#baseValue = baseValue;
    this.#precision = precision;
    this.modifiers = [];
  }

  get value() {
    const val = this.modifiers.reduce(
      (totalMod, mod) => totalMod * mod.multiplier,
      this.#baseValue
    );
    return this.#precision >= 0 ? _.round(val, this.#precision) : val;
  }

  get toObj() {
    return {
      baseValue: this.#baseValue,
      modifiers: this.modifiers,
      value: this.value,
    };
  }

  addModifier(name, level, multiplier) {
    this.modifiers.push({
      name,
      level,
      multiplier,
    });
  }
}
