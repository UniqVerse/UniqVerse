"use client"
import {getUploadedNftFileData} from "@/src/common/services/nftFiles";

export function UploadedNftImageForm({onCancel}: {onCancel?: () => void}) {
    const nftFileData = getUploadedNftFileData();
    const goBackButton = <button onClick={onCancel}>Go back</button>
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
            {goBackButton}
        </>
    )
}
