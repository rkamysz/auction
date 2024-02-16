const createAuctionClient = async (rpc, publicKey) => {
  return rpc.createClient(publicKey);
}

module.exports = { createAuctionClient }