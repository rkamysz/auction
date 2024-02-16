class Auction {
  constructor(id, name, owner, price, winner, ended) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    this.price = price || 0;
    this.winner = winner || '';
    this.ended = ended || false;
  }
}

module.exports = Auction;