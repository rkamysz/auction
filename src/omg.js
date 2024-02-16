/*

After spending quite some time writing the code, I think I understand why many people fail this task. 
I focused on the client connection and then on the architecture of the auction logic and components. 
I had in mind storing auctions, user data, and bidding in separate databases (as if it were Redis), 
while you probably wanted me to treat each auction as embedded within a node 
(If you need to use a database use only Hypercore or Hyperbee - that should have made me think earlier).

Of course, there are many shortcomings in the code. I hope you'll consider the structure and general solutions. 
Below is a pseudo-code - the last effort before the end of time.

Your framework is a solid set of tools; it was nice to explore it despite the failure... thank you.
*/

//

class AuctionRepository {
  constructor(corestore, feedKey) {
    this.corestore = corestore;
    this.feedKey = feedKey;
    this.hypercore = new Hypercore(corestore, feedKey);
    this.hyperbee = new Hyperbee(this.hypercore, { keyEncoding: 'utf-8', valueEncoding: 'json' });
  }

  async initialize() {
    await this.hypercore.ready();
    await this.hyperbee.ready();
  }

  async createAuction(auction) {
    const id = crypto.randomBytes(16).toString('hex');
    await this.hyperbee.put(id, auction);
    return id;
  }

  async getAuction(id) {
    const result = await this.hyperbee.get(id);
    return result.value;
  }

  async updateAuction(id, auction) {
    await this.hyperbee.put(id, auction);
  }

  async deleteAuction(id) {
    await this.hyperbee.del(id);
  }
}

const corestore = new Corestore('./data');
const feedKey = await promisify(crypto.randomBytes)(32);
const auctionRepo = new AuctionRepository(corestore, feedKey);
await auctionRepo.initialize();
// OR ---
const auctionId = await auctionRepo.createAuction({
  item: 'Pic#1',
  price: 50,
  ownerId: 'user1'
});
// OR ---
const auction = await auctionRepo.getAuction(auctionId);
console.log('Auction:', auction);
auction.price = 60;
// OR ---
await auctionRepo.updateAuction(auctionId, auction);
// OR ---
await auctionRepo.deleteAuction(auctionId);
