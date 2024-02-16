const { Result } = require("../../../core");

class AuctionRepositoryImpl {
  constructor(source, mapper) {
    this.source = source;
    this.mapper = mapper;
  }
    
  async open(entity) {
    try {
      const model = this.mapper.toModel(entity);
      this.source.add(model);
      return new Result().withContent(entity);  
    } catch (error) {
      return new Result().withError(error);
    }
  }

  async update(id, data) {
    try {
      const document = await this.source.get(id);
      if (document) {
        const partial = this.mapper.toModel(data);
        const modified = updateObject(document, partial);
        await this.source.put(id, modified);
        return new Result().withContent(this.mapper.toEntity(modified));  
      } else {
        return new Result().withError(new Error(`Auction with id#${id} not found, cant update/bid.`));
      }
    } catch (error) {
      return new Result().withError(error);
    }
  }
  
  async close(id) {
    try {
      const document = await this.source.get(id);
      if (document) {
        await this.source.put(id, { ...document, ended: true });
        return new Result().withContent(true);  
      } else {
        return new Result().withError(new Error(`Auction with id#${id} not found, can't close it.`));
      }
    } catch (error) {
      return new Result().withError(error);
    }    
  }
  
  async findAll() {
    try {
      // ... implemet get all auctions
      const auctions = [];
      return new Result().withContent(auctions);  
    } catch (error) {
      return new Result().withError(error);
    }    
  }

  async find(id) {
    try {
      const document = await this.source.get(id);
      if (document) {
        return new Result().withContent(this.mapper.toEntity(document));  
      } else {
        return new Result().withError(new Error(`Auction with id#${id} not found.`));
      }
    } catch (error) {
      return new Result().withError(error);
    }    
  }
}

module.exports = AuctionRepositoryImpl;
