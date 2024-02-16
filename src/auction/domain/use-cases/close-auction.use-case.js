const { Result } = require("../../../core");
const { AuctionRepository, UserRepository } = require("../repositories");

class CloseAuctionUseCase {
  static TOKEN = Symbol('CloseAuctionUseCase');
  async execute({ auctionId, userId }) {
    const auctionRepo = this.container.resolve(AuctionRepository);
    const userRepo = this.container.resolve(UserRepository);

    const userResult = await userRepo.find(userId);

    if (userResult.error) {
      return userResult;
    }
    
    if (user.ownAuctions.includes(auctionId)) {
      return auctionRepo.close(auctionId);
    }

    return new Result().withError('Not your auction cant close it');
  }
}

module.exports = CloseAuctionUseCase;