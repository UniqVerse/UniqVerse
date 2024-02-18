import type { KeyringPair } from '@polkadot/keyring/types'
import type { WeightV2 } from '@polkadot/types/interfaces'
import type { ConstructorOptions } from '@727-ventures/typechain-types'
import { ApiPromise, WsProvider } from '@polkadot/api';
// import { ContractFile } from './testContract';
import { CodePromise } from '@polkadot/api-contract';
import { ContractPromise } from '@polkadot/api-contract'
import {
    _genValidGasLimitAndValue,
    _signAndSend,
    SignAndSendSuccessResponse,
  } from '@727-ventures/typechain-types'

import contractMetadata from './nft.json';

import wasmBase64 from './nftWasmBase64.json';

// const contractWasm = Uint8Array.from(atob(wasmBase64.wasm), c => c.charCodeAt(0));

// This function deploy an smart contract to the blockchain
// Input parameter:

// initialValue: 
//          a argument to the contract constructor
// __options: 
//          additional ConstructorOptions
// signer: 
//          the entity responsible for the deployment
export const deployNFTContract = async (initialValue: string, signer: KeyringPair, __options?: ConstructorOptions) => {

    // WebSocket endpoint for the Polkadot blockchain
    const wsEndPoint = 'wss://127.0.0.1:9944';
    // const wsEndPoint = 'wss://ws.test.azero.dev';

    //Create an API instance (in order to connect to a compatible chain) 
    const wsProvider = new WsProvider(wsEndPoint);
    const api = await ApiPromise.create({ provider: wsProvider });

    // parse the contract 
    const __contract = contractMetadata;

    // use a CodePromise instance to upload the wasm code to the blockchain
    // CodePromise() : part of the polkadot library for working with contracts pallet.
    // const code = new CodePromise(api, __contract, contractWasm);

    const gasLimit = (await _genValidGasLimitAndValue(api, __options)).gasLimit as WeightV2
    const storageDepositLimit = null//__options?.storageDepositLimit

    // Prepare for the deployment transaction
    // set the gas limit, an optional storage deposit limit (storageDepositLimit), and 
    // an optional value (__options?.value). 
    // ! - "initial_vlaue" is the argument to the contract constructor or initialization 
    // method.
    // const tx = code.tx['new']!(
    //     { gasLimit, storageDepositLimit, value: __options?.value }
    //     // initialValue,
    //   )
    //
    //   let response
    //   try {
    //     // The transaction is signed and sent to the blockchain
    //     response = await _signAndSend(api.registry, tx, signer, (event: any) => event)
    //   } catch (error) {
    //     console.log(error)
    //   }

}
