const { Bid } = require("../entities");
const { BidRepository, UserRepository } = require("../repositories");

class BidOnAuctionUseCase {
  static TOKEN = Symbol('BidOnAuctionUseCase');

  constructor(container) {
    this.container = container;
  }

  async execute({ auctionId, price, bidderId }) {
    const bidRepo = this.container.resolve(BidRepository);
    const userRepo = this.container.resolve(UserRepository);
    const getAuctionResult = await bidRepo.update(new Bid(auctionId, bidderId, price));

    // await userRepo.updateAuctions(bidderId, auctionId) <---- update or add

    return getAuctionResult;
  }
}

module.exports = BidOnAuctionUseCase;