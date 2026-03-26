import tx from '@stacks/transactions';
const {
    makeContractCall,
    broadcastTransaction,
    AnchorMode,
    PostConditionMode,
    uintCV,
    principalCV,
    callReadOnlyFunction
} = tx;

import network from '@stacks/network';
const { STACKS_MAINNET } = network;

export const DEFAULT_CONTRACT_ADDRESS = 'SP31G2FZ5JN87BATZMP4ZRYE5F7WZQDNEXJ7G7X97';
export const DEFAULT_CONTRACT_NAME = 'simple-nft-v4';

/**
 * Simple NFT Mint SDK for Stacks (Bitcoin L2)
 */
export class SimpleNFTMint {
    /**
     * Initialize SDK
     * @param {Object} options 
     * @param {string} [options.contractAddress] The Stacks address that deployed the contract
     * @param {string} [options.contractName] The contract name
     * @param {object} [options.network] Network object (e.g. STACKS_MAINNET)
     */
    constructor({ 
        contractAddress = DEFAULT_CONTRACT_ADDRESS, 
        contractName = DEFAULT_CONTRACT_NAME, 
        network = STACKS_MAINNET 
    } = {}) {
        this.contractAddress = contractAddress;
        this.contractName = contractName;
        this.network = network;
    }

    /**
     * Get the last minted token ID
     * @returns {Promise<number>}
     */
    async getLastTokenId() {
        try {
            const result = await callReadOnlyFunction({
                contractAddress: this.contractAddress,
                contractName: this.contractName,
                functionName: 'get-last-token-id',
                functionArgs: [],
                senderAddress: this.contractAddress,
                network: this.network
            });
            return Number(result.value);
        } catch (error) {
            throw new Error(`Failed to fetch last token ID: ${error.message}`);
        }
    }

    /**
     * Get the total number of minted NFTs
     * @returns {Promise<number>}
     */
    async getTotalMinted() {
        try {
            const result = await callReadOnlyFunction({
                contractAddress: this.contractAddress,
                contractName: this.contractName,
                functionName: 'get-total-minted',
                functionArgs: [],
                senderAddress: this.contractAddress,
                network: this.network
            });
            return Number(result.value);
        } catch (error) {
            throw new Error(`Failed to fetch total minted: ${error.message}`);
        }
    }

    /**
     * Get the current mint price
     * @returns {Promise<number>}
     */
    async getMintPrice() {
        try {
            const result = await callReadOnlyFunction({
                contractAddress: this.contractAddress,
                contractName: this.contractName,
                functionName: 'get-mint-price',
                functionArgs: [],
                senderAddress: this.contractAddress,
                network: this.network
            });
            return Number(result.value);
        } catch (error) {
            throw new Error(`Failed to fetch mint price: ${error.message}`);
        }
    }

    /**
     * Mint a new NFT
     * @param {string} senderKey Private key of the minter
     * @param {number} [fee=10000] Transaction fee
     * @returns {Promise<Object>} Broadcast response
     */
    async mint(senderKey, fee = 10000) {
        const txOptions = {
            contractAddress: this.contractAddress,
            contractName: this.contractName,
            functionName: 'mint',
            functionArgs: [],
            senderKey,
            network: this.network,
            anchorMode: AnchorMode.Any,
            postConditionMode: PostConditionMode.Allow,
            fee: BigInt(fee),
        };

        const tx = await makeContractCall(txOptions);
        return broadcastTransaction({ transaction: tx, network: this.network });
    }

    /**
     * Transfer an NFT
     * @param {number} tokenId 
     * @param {string} senderAddress
     * @param {string} recipientAddress
     * @param {string} senderKey 
     * @param {number} [fee=10000]
     */
    async transfer(tokenId, senderAddress, recipientAddress, senderKey, fee = 10000) {
        const txOptions = {
            contractAddress: this.contractAddress,
            contractName: this.contractName,
            functionName: 'transfer',
            functionArgs: [
                uintCV(tokenId),
                principalCV(senderAddress),
                principalCV(recipientAddress)
            ],
            senderKey,
            network: this.network,
            anchorMode: AnchorMode.Any,
            postConditionMode: PostConditionMode.Allow,
            fee: BigInt(fee),
        };

        const tx = await makeContractCall(txOptions);
        return broadcastTransaction({ transaction: tx, network: this.network });
    }
}
