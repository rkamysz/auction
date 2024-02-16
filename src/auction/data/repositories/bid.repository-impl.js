const { Result } = require("../../../core");

class BidRepositoryImpl {
  constructor(source, mapper) {
    this.source = source;
    this.mapper = mapper;
  }

  async update(data) {
    try {
      const document = await this.source.get(data.auction);
      if (document) {
        document.bids[data.user] = data.amount;
        const document = await this.source.put(data.auction, document);
        return new Result().withContent(true);
      } else {
        const bid = this.mapper.toModel(data);
        await this.source.put(data.auction, { [bid.user]: bid.amount });
      }
    } catch (error) {
      return new Result().withError(error);
    }
  }
}

module.exports = BidRepositoryImpl;
