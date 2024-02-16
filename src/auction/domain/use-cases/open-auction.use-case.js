const { nanoid } = require("nanoid");
const { Auction } = require("../entities");

class OpenAuctionUseCase {
  static TOKEN = Symbol('OpenAuctionUseCase');
  async execute({ item, price, userId }) {
    const auctionRepo = this.container.resolve(AuctionRepository);
    return auctionRepo.open(new Auction(nanoid(), item, userId, price));
  }
}

module.exports = OpenAuctionUseCase;