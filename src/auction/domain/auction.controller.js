const { OpenAuctionUseCase, CloseAuctionUseCase, BidOnAuctionUseCase } = require("./use-cases");

class AuctionController {
  static TOKEN = Symbol('AuctionController');

  constructor(container) {
    this.openAuctionUseCase = container.resolve(OpenAuctionUseCase.TOKEN);
    this.closeAuctionUseCase = container.resolve(CloseAuctionUseCase.TOKEN);
    this.bidOnAuctionUseCase = container.resolve(BidOnAuctionUseCase.TOKEN);
  }

  async openAuction(data) {
    return this.openAuctionUseCase.execute(data);
  }

  async bidOnAuction(data) {
    return this.bidOnAuctionUseCase.execute(data);
  }

  async closeAuction(data) {
    return this.closeAuctionUseCase.execute(data);
  }

  async getAuctionById(auctionId) {
    //
  }

  async getAllAuctions() {
    //
  }
}

module.exports = AuctionController;
