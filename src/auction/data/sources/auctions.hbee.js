const HyperBeeSource = require('./hbee.source');

class AuctionsHyperBee {
  collection;
  async setup() {
    const db = new HyperBeeSource()
    await db.setup('auctions');
    this.collection = db.collection;
  }
}

module.exports = AuctionsHyperBee;
