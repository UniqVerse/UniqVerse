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
        "upload": {left: <>left</>, right: <UploadForm onSuccess={onFileUploaded}/>},
        "searchResult": {
            left: <SearchResult onCancel={onSearchCancel}/>,
            right: <UploadedNftImageForm onCancel={onSearchCancel}/>},
        "publishNft": {left: <>left</>, right: <PublishNft/>},
    }
    return (
        <div className={"flex"}>
            <div className={"w-2/3 flex"}>
                {steps[step].left}
            </div>
            <div className={"w-1/3 flex"}>
                {steps[step].right}
            </div>
        </div>
    )
}
