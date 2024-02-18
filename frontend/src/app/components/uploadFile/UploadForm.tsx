'use client'

import { saveUploadedNftFileData } from '@/src/common/services/nftFiles';
import { NftFileData } from '@/src/common/types/data/NftData';
import { BaseResponse, isSuccessResponse } from '@/src/common/types/responses/baseResponse';
import {ChangeEvent, useRef, useState} from 'react'
import Loading from "@/src/app/components/loading/loading";

export function UploadForm({onSuccess}: {onSuccess?: (data: NftFileData) => void}) {
  const [uploading, setUploading] = useState<boolean>(false);

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
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
      <form>
      {/*<form onSubmit={onSubmit}>*/}
        {/*<input*/}
        {/*    type="file"*/}
        {/*    name="file"*/}
        {/*    ref={inputRef}*/}
        {/*    onChange={(e) => setFile(e.target.files?.[0])}*/}
        {/*/>*/}
        {/*<input type="submit" value="Upload" disabled={uploading}/>*/}

        {
          uploading ? <Loading/> :
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file"
                       className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or
                      drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" name='file' className="hidden" onChange={onChangeFile}/>
                </label>
              </div>
        }

      </form>
    </>
  )
}
