/*
{
  "auction_id": "loremipsum1234567",
  "bids": {
    "user_hash_1": 175,
    "user_hash_2": 280.5,
    "user_hash_3": 170
  }
}
*/
class BidDocument {
  auction_id;
  bids;
}
/*
{
  "id": "loremipsum1234567",
  "owner_id": "user_hash_111211",
  "price": 123.2,
  "winner_id": "user_hash_123456",
  "name": "Some cool stuff",
  "ended": true
}
*/
class AuctionDocument {
  id;
  name;
  price;
  winner_id;
  owner_id;
  ended;
}
/*
{
  "id": "user_hash_1234567",
  "name": "zero_cool",
  "email": "zero@co.ol",
  "own_auctions": ["auction_id_1", "auction_id_2"],
  "auctions": ["auction_id_3", "auction_id_4"]
}
*/
class UserDocument {
  id;
  name;
  email;
  own_auctions;
  auctions;
}
module.exports = {
  BidDocument,
  AuctionDocument,
  UserDocument
}