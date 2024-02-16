const { User } = require("../../domain");

class UserHbeeMapper {
  toEntity(model) {
    const { id, name, email, own_auctions, auctions } = model;
    return new User(id, name, email, own_auctions, auctions);
  }
  
  toModel(entity) {
    const { id, name, email, ownAuctions, auctions } = entity;
    return { id, name, email, own_auctions: ownAuctions, auctions };
  }
}

module.exports = { UserHbeeMapper };