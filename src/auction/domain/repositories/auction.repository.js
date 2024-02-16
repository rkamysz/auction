class AuctionRepository {
  static TOKEN = Symbol('AuctionRepository');
  async create(auction) {}
  async findById(id) {}
  async findAll() {}
  async update(auction) {}
  async delete(id) {}
}

module.exports = AuctionRepository;
