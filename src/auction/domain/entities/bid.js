class Bid {
  constructor(id, auctionId, userId, amount) {
    this.id = id;
    this.auctionId = auctionId;
    this.userId = userId;
    this.amount = amount;
  }
}

module.exports = Bid;