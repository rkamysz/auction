const { Auction } = require("../../domain");

class AuctionHbeeMapper {
  toEntity(model) {
    const { id, name, owner_id, price, winner_id, ended } = model;
    return new Auction(id, name, owner_id, price, winner_id, ended)
  }

  toModel(entity) {
    const { id, name, owner, price, winner, ended } = entity;
    return { id, name, owner_id: owner, winner_id: winner, price, ended };
  }
}

module.exports = { AuctionHbeeMapper };