const HyperBeeSource = require('./hbee.source');

class UsersHyperBee {
  collection;
  async setup() {
    const db = new HyperBeeSource()
    await db.setup('users');
    this.collection = db.collection;
  }
}

module.exports = UsersHyperBee;
