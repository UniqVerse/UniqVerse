"use client"
import {getUploadedNftFileData} from "@/src/common/services/nftFiles";

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
                <button type="button"
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Mint NFT
                </button>
            </div>
        </>
    )
}
