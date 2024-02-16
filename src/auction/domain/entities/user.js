class User {
  constructor(id, name, email, ownAuctions, auctions) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.ownAuctions = ownAuctions;
    this.auctions = auctions;
  }
}

module.exports = User;
