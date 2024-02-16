const HyperBeeSource = require('./hbee.source');

class BidsHyperBee {
  collection;
  async setup() {
    const db = new HyperBeeSource()
    await db.setup('bids');
    this.collection = db.collection;
  }
}

module.exports = BidsHyperBee;
