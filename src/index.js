const Commander = require('./app/commander');
const { createAuctionClient } = require('./app/auction-client');
const { createAuctionServer } = require('./app/auction-server');
const { setupAuctionClientDatabase } = require('./app/auction-client.db');
const { setupRPC } = require('./app/rpc');
const { setupDependencies } = require('./app/dependencies');

const main = async () => {
  const commander = new Commander();
  const { seed } = await setupAuctionClientDatabase();
  const { rpc, publicKey } = await setupRPC('127.0.0.1', 30001, seed); // <--- should use env VARS
  const dependencies = await setupDependencies();

  await createAuctionServer(rpc, publicKey, dependencies);
  const client = await createAuctionClient(rpc, publicKey);

  commander.on('open', async ({ item, price }) => {
    await client.request('openAuction', { item, price });
  });

  commander.on('bid', async ({ auctionId, price }) => {
    await client.request('bidOnAuction', { auctionId, price });
  });

  commander.on('close', async ({ auctionId }) => {
    await client.request('closeAuction', { auctionId });
  });

  commander.start().catch(console.error);
};

main().catch(console.error);
