const RPC = require('@hyperswarm/rpc');
const DHT = require('hyperdht');
const Hypercore = require('hypercore');
const Hyperbee = require('hyperbee');
const crypto = require('crypto');

const Commander = require('./app/commander');
const { createAuctionClient } = require('./app/auction-client');
const { createAuctionServer } = require('./app/auction-server');

const main = async () => {
  const commander = new Commander();
  const hcore = new Hypercore('./db/auction-client');
  const hbee = new Hyperbee(hcore, { keyEncoding: 'utf-8', valueEncoding: 'binary' });
  await hbee.ready();

  let dhtSeed = (await hbee.get('dht-seed'))?.value;
  if (!dhtSeed) {
    dhtSeed = crypto.randomBytes(32);
    await hbee.put('dht-seed', dhtSeed);
  }

  const dht = new DHT({
    port: 60001,
    keyPair: DHT.keyPair(dhtSeed),
    bootstrap: [{ host: '127.0.0.1', port: 30001 }]
  });
  await dht.ready();

  const publicKey = Buffer.from(keyPair.publicKey).toString('hex');
  const rpc = new RPC({ dht });
  await createAuctionServer(rpc, publicKey);
  const client = await createAuctionClient(rpc, publicKey);

  commander.on('open', async ({ item, price }) => {
    await client.request('openAuction', { item, price });
  });

  commander.on('bid', async ({ auctionId, price }) => {
    await client.request('bidOnAuction', { auctionId, price });
  });

  commander.on('close', async ({ auctionId, finalPrice }) => {
    await client.request('closeAuction', { auctionId, finalPrice });
  });

  commander.start().catch(console.error);
};

main().catch(console.error);
