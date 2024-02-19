"use client"
import * as abi from './nft.json'
import {getUploadedNftFileData} from "@/src/common/services/nftFiles";
import {BlueprintPromise} from "@polkadot/api-contract";
import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";


export function UploadedNftImageForm({onCancel}: {onCancel?: () => void}) {
    const nftFileData = getUploadedNftFileData();
    const goBackButton = <button className={"text-primaryStatic"} onClick={onCancel}>Upload other</button>
    if (!nftFileData) {
        return (
            <>
                <h1>No NFT file data found</h1>
                {goBackButton}
            </>
        )
    }
    const mintNft = async () => {
        const wsProvider = new WsProvider('ws://127.0.0.1:9944');
        const api = await ApiPromise.create({ provider: wsProvider })
        // const blueprint = new BlueprintPromise(api, abi, "0xb5dda14042f7d7c89b4d6598013a2633de4343fba7024498c88f5c08c4fbf7a5");
        const blueprint = new BlueprintPromise(api, abi, "0x04e27e6733fca7fce21c1421d041d881e2b1118b8cb3e0f4f59fab9f9b423eaf");
        const tx = blueprint.tx.new({
            gasLimit: 0,
        });
        let address;
        const keyring = new Keyring({ type: 'sr25519' });
        const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });
        const unsub = await tx.signAndSend(alice, (result) => {
            console.log(result)
            // if (status.isInBlock || status.isFinalized) {
            //     console.log(dispatchInfo)
            //     // address = contract.address.toString();
            //     unsub();
            // }
        });
    }
    const {url} = nftFileData;
    return (
        <>
            <img src={url} alt="NFT Image" width={500} height={500}/>
            <div className={"text-center"}>{goBackButton}</div>

            <div className={"text-center gap-10"}>
                <h1>Your content <span className={"text-rarityUncommon"}>is 23% unique</span></h1>
                <div>
                    Your rank: <span className={"text-rarityUncommon"}>uncommon</span>
                </div>
                <button onClick={mintNft} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Mint NFT
                </button>
            </div>
        </>
    )
}
