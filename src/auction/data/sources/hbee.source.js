const { Hypercore } = require('hypercore');
const { Hyperbee } = require('hyperbee');

class HyperBeeSource {
  collection;
  async setup(name) {
    const hcore = new Hypercore(`./db/${name}`);
    this.collection = new Hyperbee(hcore, { keyEncoding: 'utf-8', valueEncoding: 'json' });
    await this.collection.ready();
    console.log(`${name} database ready.`);
  }

  async add(data) {
    return this.collection.put(data.id, data);
  }

  async update(id, data) {
    return this.collection.put(id, data);
  }

  async remove(id) {
    return this.collection.del(id);
  }

  async find(id) {
    return this.collection.get(id);
  }
}

module.exports = HyperBeeSource;
