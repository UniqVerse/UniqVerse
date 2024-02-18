'use client'

import {saveUploadedNftFileData} from '@/src/common/services/nftFiles';
import {NftFileData} from '@/src/common/types/data/NftData';
import {BaseResponse, isSuccessResponse} from '@/src/common/types/responses/baseResponse';
import {ChangeEvent, useRef, useState} from 'react'
import Loading from "@/src/app/components/loading/loading";
import {UploadButton} from "@/src/app/components/uploadFile/uploadButton/UploadButton";

export function UploadForm({onSuccess}: { onSuccess?: (data: NftFileData) => void }) {
    const [uploading, setUploading] = useState<boolean>(false);

    const onChangeFile = async (file: File) => {
        try {
            setUploading(true);
            const data = new FormData()
            data.set('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            })
            // handle the error
            console.log(res);
            if (!res.ok) throw new Error(await res.text())
            const response = (await res.json()) as BaseResponse<NftFileData>
            if (isSuccessResponse(response)) {
                onSuccess && onSuccess(response.data as NftFileData)
            } else {
                throw new Error(response.message)
            }
        } catch (e: any) {
            console.error(e)
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
            <div>
                {/*<form onSubmit={onSubmit}>*/}
                {/*<input*/}
                {/*    type="file"*/}
                {/*    name="file"*/}
                {/*    ref={inputRef}*/}
                {/*    onChange={(e) => setFile(e.target.files?.[0])}*/}
                {/*/>*/}
                {/*<input type="submit" value="Upload" disabled={uploading}/>*/}

                <div className={"text-center border-solid "}>
                    <div>
                        <button>Connect wallet</button>
                    </div>
                    <div className={''}>
                        {
                        uploading ? <Loading/> :
                        <UploadButton onChangeFile={onChangeFile}/>
                        }
                    </div>
                    <div className={"headline-large"}>Time to upload your amazing content 🤩</div>
                </div>
            </div>
        </>
    )
}
