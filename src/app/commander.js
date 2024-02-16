const readline = require('readline');
const { EventEmitter } = require('events');

class Commander extends EventEmitter {
  constructor() {
    super();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async start() {
    this.rl.setPrompt('Enter command (open, bid, close): ');
    this.rl.prompt();
    for await (const command of this.rl) {
      if (command.trim() === 'open') {
        await this.handleOpen();
      } else if (command.trim() === 'bid') {
        await this.handleBid();
      } else if (command.trim() === 'close') {
        await this.handleClose();
      } else {
        console.log('Unknown command');
      }
      this.rl.prompt();
    }
  }

  async handleOpen() {
    const item = await this.questionAsync('Enter item name: ');
    const price = await this.questionAsync('Enter price: ');
    this.emit('open', { item, price });
  }

  async handleBid() {
    const auctionId = await this.questionAsync('Enter auction ID: ');
    const price = await this.questionAsync('Enter your bid: ');
    this.emit('bid', { auctionId, price });
  }

  async handleClose() {
    const auctionId = await this.questionAsync('Enter auction ID: ');
    this.emit('close', { auctionId });
  }

  questionAsync(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer.trim());
      });
    });
  }
}

module.exports = Commander;
