class Container {
  constructor() {
    this.instances = new Map();
  }

  bind(key, cls) {
    this.instances.set(key, new cls());
  }

  bindToValue(key, value) {
    this.instances.set(key, value);
  }

  resolve(key) {
    return this.instances.get(key);
  }
}

module.exports = Container;