# Simple NFT Mint SDK

Professional SDK for interacting with the Simple NFT Mint smart contract on the Stacks blockchain.

## Installation

```bash
npm install simple-nft-mint
```

## Features

- Mint new NFTs
- Transfer NFTs
- Query contract state (total minted, last token ID, mint price)
- Supports Mainnet and Testnet

## Usage

### Initialize SDK

```javascript
import { SimpleNFTMint } from 'simple-nft-mint';

// Mainnet (default)
const sdk = new SimpleNFTMint();

// Testnet
import network from '@stacks/network';
const { STACKS_TESTNET } = network;

const testnetSdk = new SimpleNFTMint({ network: STACKS_TESTNET });
```

### Query Contract State

```javascript
const total = await sdk.getTotalMinted();
console.log(`Total NFTs minted: ${total}`);

const price = await sdk.getMintPrice();
console.log(`Current mint price: ${price} microSTX`);
```

### Mint an NFT

```javascript
const privateKey = 'YOUR_PRIVATE_KEY_HEX';
const result = await sdk.mint(privateKey);

if (result.txid) {
    console.log(`Mint transaction broadcast: ${result.txid}`);
} else {
    console.error(`Mint failed: ${result.error}`);
}
```

### Transfer an NFT

```javascript
const result = await sdk.transfer(
    1, // tokenId
    'SPADDRESS1...', // sender address
    'SPADDRESS2...', // recipient address
    'SENDER_PRIVATE_KEY'
);
```

## License

MIT

## API Reference

| Method | Arguments | Returns | Description |
|---|---|---|---|
| `new SimpleNFTMint(opts?)` | `opts.contractAddress`, `opts.contractName`, `opts.network` | `SimpleNFTMint` | Initialize the SDK |
| `getLastTokenId()` | — | `Promise<number>` | Last minted token ID |
| `getTotalMinted()` | — | `Promise<number>` | Total NFTs minted so far |
| `getMintPrice()` | — | `Promise<number>` | Current mint price in microSTX |
| `mint(senderKey, fee?)` | `senderKey: string`, `fee?: number` (default `10000`) | `Promise<Object>` | Broadcast a mint transaction |
| `transfer(tokenId, sender, recipient, senderKey, fee?)` | see above | `Promise<Object>` | Transfer an NFT to another address |
