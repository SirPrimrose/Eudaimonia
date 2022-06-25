import _ from 'lodash';

export default class CalculatedValue {
  #baseValue;

  #precision;

  static MODIFIER_TYPE = {
    MULTIPLICATIVE: 'Multiplicative',
    ADDITIVE: 'Additive',
  };

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
      (totalMod, mod) =>
        mod.type === CalculatedValue.MODIFIER_TYPE.ADDITIVE
          ? totalMod + mod.multiplier
          : totalMod * mod.multiplier,
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

  /**
   * name, level - For display
   * type - additive or multiplicative (order does matter)
   * multiplier - value to add/multiply by
   */
  addModifier(name, type, level, multiplier) {
    this.modifiers.push({
      name,
      type,
      level,
      multiplier,
    });
  }
}
