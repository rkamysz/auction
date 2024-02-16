class AuctionRepository {
  static TOKEN = Symbol('AuctionRepository');
  async open(data) {}
  async update(data) {}
  async close(data) {}
  async findAll() {}
  async find(data) {}
}

module.exports = AuctionRepository;
