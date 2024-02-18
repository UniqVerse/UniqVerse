'use client'
import {getUploadedNftFileData} from "@/src/common/services/nftFiles";
import {isSuccessResponse} from "@/src/common/types/responses/baseResponse";
import {useEffect, useState} from "react";
import {distanceToSimilarityPercent} from "@/src/common/services/rarity";

export type DbNFT = {
    _additional: {
        distance: number,
        id: string
    },
    name: string
}
const baseUrl = "https://uniqverse.s3.amazonaws.com/nfts/"
// const baseUrl = "https://nl7uonihk4kz1n5n.public.blob.vercel-storage.com/nfts/"
export default function SearchResult({onCancel}: { onCancel?: () => void }) {
    const [nfts, setNfts] = useState<{ nfts: DbNFT[] }>({nfts: []})
    const [loaded, setLoaded] = useState<boolean>(false)
    const nftFileData = getUploadedNftFileData();
    const goBackButton = <button className={"bg-opacity0"} onClick={onCancel}>Go back</button>

    useEffect(() => {
        if (loaded) return
        fetch("/api/getSimilarImages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nftFileData)
        })
            .then(value => value
                .json()
                .then(
                    (v => isSuccessResponse(v) ? setNfts({nfts: v.data as any}) : console.error(v))
                ))
            .then(() => setLoaded(true));
    })

    if (!nftFileData) {
        return (
            <>
                <h1>No NFT file data found</h1>
                {goBackButton}
            </>
        )
    }

    if (!loaded) {
        return (
            <>
                <h1>Looking for the similar images...</h1>
            </>
        )
    }

    return (
        <>
            <div><span>Found:</span> <span>{nfts.nfts.length} similar content</span></div>
            <div className={"grid grid-cols-2 md:grid-cols-5 gap-4"}>
                {nfts.nfts.map((nft, index) => (
                    <div key={index} className={''}>
                        <img src={baseUrl + nft.name} alt="NFT Image" className={"h-min max-w-full rounded-lg"}/>
                        <div className={"text-center"}>{Math.round(distanceToSimilarityPercent(nft._additional.distance))}%</div>
                    </div>
                ))}
            </div>
        </>
    )
}


// [
//     {
//         "_additional": {
//             "distance": 0.42595363,
//             "id": "6fae37e7-11fc-43cf-8cda-ed56b8c7ef3d"
//         },
//         "name": "img_5.jpg"
//     },
//     {
//         "_additional": {
//             "distance": 0.44894505,
//             "id": "17209402-39d2-4e05-914a-f1f7aa5baaa5"
//         },
//         "name": "img_2.jpg"
//     },
//     {
//         "_additional": {
//             "distance": 0.46548343,
//             "id": "525f1f38-d7ac-4de7-9c1b-6865a33be2c8"
//         },
//         "name": "img_6.jpg"
//     },
//     {
//         "_additional": {
//             "distance": 0.46548343,
//             "id": "2c71c0f1-0f9c-41c1-ad4b-8764ffa420b3"
//         },
//         "name": "img_7.jpg"
//     },
//     {
//         "_additional": {
//             "distance": 0.46548343,
//             "id": "fba905e0-62a8-41f3-8e5a-d812f167e4c6"
//         },
//         "name": "img_8.jpg"
//     },
//     {
//         "_additional": {
//             "distance": 0.47679532,
//             "id": "64ef73e4-4d88-4188-aa1e-fcbffc135078"
//         },
//         "name": "img_9.jpg"
//     },
//     {
//         "_additional": {
//             "distance": 0.4785741,
//             "id": "9ed08968-6514-4fd7-a0e4-2a8b0c80ad26"
//         },
//         "name": "img.jpg"
//     },
//     {
//         "_additional": {
//             "distance": 0.5086376,
//             "id": "08b47f6b-2728-4b12-842a-772e94861fde"
//         },
//         "name": "img_1.jpg"
//     },
//     {
//         "_additional": {
//             "distance": 0.5672562,
//             "id": "5fc6038a-653a-4795-a758-be63fa584cff"
//         },
//         "name": "img_4.jpg"
//     },
//     {
//         "_additional": {
//             "distance": 0.570766,
//             "id": "3ef03112-14a6-4ec5-bc7f-be1ffaaa0c9c"
//         },
//         "name": "img_3.jpg"
//     }
// ]
