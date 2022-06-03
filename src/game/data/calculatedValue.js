export default class CalculatedValue {
  constructor(baseValue) {
    this.baseValue = baseValue;
    this.modifiers = [];
  }

  get value() {
    const val = this.modifiers.reduce(
      (totalMod, mod) => totalMod * mod.multiplier,
      this.baseValue
    );
    return val;
  }

  get obj() {
    return {
      baseValue: this.baseValue,
      modifiers: this.modifiers,
      value: this.value,
    };
  }

  addModifier(name, multiplier) {
    this.modifiers.push({
      name,
      multiplier,
    });
  }
}
