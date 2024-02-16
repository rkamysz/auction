class RpcMiddleware {
  constructor(auctionController) {
    this.auctionController = auctionController;
  }

  async handleRequest(request) {
    const { method, params } = request;

    switch (method) {
      case 'createAuction':
        return this.createAuction(params);
      case 'getAuctionById':
        return this.getAuctionById(params);
      case 'getAllAuctions':
        return this.getAllAuctions(params);
      case 'updateAuction':
        return this.updateAuction(params);
      case 'deleteAuction':
        return this.deleteAuction(params);
      default:
        return { error: 'Method not found' };
    }
  }

  async createAuction(params) {
    return this.auctionController.createAuction(params);
  }

  async getAuctionById(params) {
    return this.auctionController.getAuctionById(params);
  }

  async getAllAuctions(params) {
    return this.auctionController.getAllAuctions(params);
  }

  async updateAuction(params) {
    return this.auctionController.updateAuction(params);
  }

  async deleteAuction(params) {
    return this.auctionController.deleteAuction(params);
  }
}

module.exports = RpcMiddleware;
