"use client"
import {PublishNft} from "../publishNft/publishNft"
import {UploadForm} from "../uploadFile/UploadForm"
import {JSX, useEffect, useState} from "react";
import {
    existsUploadedNftFileData,
    removeUploadedNftFileData,
    saveUploadedNftFileData
} from "@/src/common/services/nftFiles";
import {NftFileData} from "@/src/common/types/data/NftData";
import {UploadedNftImageForm} from "@/src/app/components/uploadedNftImageForm/UploadedNftImageForm";
import SearchResult from "@/src/app/components/searchResult/SearchResult";
import {marketplaceUnderDevelopment} from "@/src/common/services/underDevelopment";
import MarketplacePreview from "@/src/app/components/marketplacePreview/MarketplacePreview";
import ConnectButton from "@/src/app/components/connectButton/ConnectButton";

export function ValidateAndPublishNft() {

    const [step, setStep] = useState("upload")

    useEffect(() => {
        existsUploadedNftFileData() && setStep("searchResult")
    })

    const onFileUploaded = (data: NftFileData) => {
        setStep("searchResult")
        saveUploadedNftFileData(data)
    }
    const onSearchCancel = () => {
        setStep("upload")
        removeUploadedNftFileData().catch(console.error)
    }
    const steps: Record<string, { left: JSX.Element, right: JSX.Element }> = {
        "upload": {left: <MarketplacePreview/>, right: <UploadForm onSuccess={onFileUploaded}/>},
        "searchResult": {
            left: <SearchResult onCancel={onSearchCancel}/>,
            right: <UploadedNftImageForm onCancel={onSearchCancel}/>},
        "publishNft": {left: <>left</>, right: <PublishNft/>},
    }

    return (
        <div className={"grid grid-cols-3"}>
            <div className={"col-span-2 p-10 flex flex-col gap-10"}>
                <div className={'flex justify-between'}>
                    <div className={'flex gap-8'}>
                        <img src={'logo.svg'} alt={'UniqVerse'}/>
                        <img src={'powered_by_aleph.svg'} alt={'Powered by Aleph Zero'}/>
                    </div>
                    <div>
                        <a className={"cursor-pointer text-primaryStatic"} onClick={marketplaceUnderDevelopment}>Marketplace</a>
                    </div>
                </div>
                <div>{steps[step].left}</div>
            </div>
            <div className={""}>
                <ConnectButton/>
                {steps[step].right}
            </div>
        </div>
    )
}
