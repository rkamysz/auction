const readline = require('readline');
const RPC = require('@hyperswarm/rpc');
const DHT = require('hyperdht');
const Hypercore = require('hypercore');
const Hyperbee = require('hyperbee');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const main = async () => {
  const hcore = new Hypercore('./db/auction-client');
  const hbee = new Hyperbee(hcore, { keyEncoding: 'utf-8', valueEncoding: 'binary' });
  await hbee.ready();

  let dhtSeed = (await hbee.get('dht-seed'))?.value;
  if (!dhtSeed) {
    dhtSeed = crypto.randomBytes(32);
    await hbee.put('dht-seed', dhtSeed);
  }

  const dht = new DHT({
    port: 60001,
    keyPair: DHT.keyPair(dhtSeed),
    bootstrap: [{ host: '127.0.0.1', port: 30001 }]
  });
  await dht.ready();

  const rpc = new RPC({ dht });

  const server = rpc.createServer();
  await server.listen();

  //

  const handleCommand = async (command) => {
    if (command === 'open') {
      //
    } else if (command === 'bid') {
      //
    } else if (command === 'close') {
      //
    } else {
      console.log('Unknown command');
      handleCommand(await askForCommand());
    }
  };

  const askForCommand = async () => {
    return new Promise((resolve) => {
      rl.question('Enter command (open, bid, close): ', (command) => {
        resolve(command);
      });
    });
  };

  handleCommand(await askForCommand());
};

main().catch(console.error);
