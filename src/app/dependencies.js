const {
  AuctionRepositoryImpl,
  AuctionHbeeMapper,
  AuctionsHyperBee,
  BidsHyperBee,
  BidRepositoryImpl,
  BidHbeeMapper,
  UsersHyperBee
} = require("../auction/data");
const { UserHbeeMapper } = require("../auction/data/mappers");
const { UserRepositoryImpl } = require("../auction/data/repositories");
const {
  AuctionController,
  OpenAuctionUseCase,
  CloseAuctionUseCase,
  BidOnAuctionUseCase,
  AuctionRepository
} = require("../auction/domain");
const { BidRepository, UserRepository } = require("../auction/domain/repositories");
const { Container } = require("../core")

const setupDependencies = async () => {
  const container = new Container();

  // setup AUCTION database and repository
  const auctionDb = new AuctionsHyperBee();
  await auctionDb.setup();
  const auctionRepo = new AuctionRepositoryImpl(auctionDb, new AuctionHbeeMapper());
  container.bindToValue(AuctionRepository.TOKEN, auctionRepo);

  // setup BID database and repository
  const bidDb = new BidsHyperBee();
  await bidDb.setup();
  const bidRepo = new BidRepositoryImpl(bidDb, new BidHbeeMapper());
  container.bindToValue(BidRepository.TOKEN, bidRepo);

  // setup USER database and repository
  const userDb = new UsersHyperBee();
  await userDb.setup();
  const userRepo = new UserRepositoryImpl(userDb, new UserHbeeMapper());
  container.bindToValue(UserRepository.TOKEN, userRepo);

  container.bind(OpenAuctionUseCase.TOKEN, OpenAuctionUseCase);
  container.bind(CloseAuctionUseCase.TOKEN, CloseAuctionUseCase);
  container.bind(BidOnAuctionUseCase.TOKEN, BidOnAuctionUseCase);
  container.bindToValue(AuctionController.TOKEN, new AuctionController(container));

  return container;
}

module.exports = { setupDependencies }