const RPC = require('@hyperswarm/rpc');
const DHT = require('hyperdht');

const setupRPC = async (host, port, seed) => {
  const dht = new DHT({
    port: 60001,  // <--- why 40001?
    keyPair: DHT.keyPair(seed),
    bootstrap: [{ host, port }]
  });
  await dht.ready();
  
  const publicKey = Buffer.from(dht.keyPair().publicKey).toString('hex');
  const rpc = new RPC({ dht });

  return { rpc, publicKey };
}

module.exports = { setupRPC };