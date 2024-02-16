const Hypercore = require('hypercore');
const Hyperbee = require('hyperbee');
const crypto = require('crypto');

export const setupAuctionClientDatabase = async () => {
  const hcore = new Hypercore('./db/auction-client');
  const hbee = new Hyperbee(hcore, { keyEncoding: 'utf-8', valueEncoding: 'binary' });
  await hbee.ready();

  let dhtSeed = (await hbee.get('dht-seed'))?.value;
  if (!dhtSeed) {
    dhtSeed = crypto.randomBytes(32);
    await hbee.put('dht-seed', dhtSeed);
  }

  return { seed };
}

module.exports = { setupAuctionClientDatabase };