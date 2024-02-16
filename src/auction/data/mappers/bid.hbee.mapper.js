const { Bid } = require("../../domain");

class BidHbeeMapper {
  toEntity(model) {
    const { auction_id, user, amount } = model;
    return new Bid(auction_id, user, amount)
  }
  
  toModel(entity) {
    const { auction, user, amount } = entity;
    return { auction_id: auction, user, amount };
  }
}

module.exports = { BidHbeeMapper };