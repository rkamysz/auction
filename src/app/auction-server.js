const { AuctionController } = require("../auction/domain");

const createAuctionServer = async (rpc, publicKey, container) => {
  const server = rpc.createServer();
  await server.listen();

  const auctionController = container.get(AuctionController.TOKEN);

  if (!auctionController) {
    throw new Error('Missing auction controller. Configure depenedencies first.');
  }

  server.register('openAuction', async ({ item, price }, cb) => {
    const useerId = publicKey;
    const result = await auctionController.openAuction(userId, item, price);

    if (result.error) {
      cb(result.error);
    } else {
      console.log(`Auction opened for ${item} with price ${price} by ${useerId}`);
      server.broadcast('notifyAuctionOpened', { item, price, userId });
      cb(null, 'Auction opened successfully');
    }
  });

  server.register('bidOnAuction', async ({ auctionId, price }, cb) => {
    const bidderId = publicKey;
    const result = await auctionController.bidOnAuction({ auctionId, price, bidderId });
    if (result.error) {
      cb(result.error);
    } else {
      console.log(`Bid submitted for ${auctionId} with price ${price} by ${bidderId}`);
      server.broadcast('bidOnAuction', { auctionId, price, bidderId });
      cb(null, 'Bid submitted successfully');
    }
  });

  server.register('closeAuction', async ({ auctionId }, cb) => {
    const userId = publicKey;
    const result = await auctionController.closeAuction({ auctionId, userId });
    if (result.error) {
      cb(result.error);
    } else {
      console.log(`Auction closed for ${auctionId}, winner: ${userId}`);
      server.broadcast('notifyAuctionClosed', { auctionId, userId });
      cb(null, 'Auction closed successfully');
    }
  });

  return server;
}

module.exports = { createAuctionServer }