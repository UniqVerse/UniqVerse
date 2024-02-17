'use client'

import { saveUploadedNftFileData } from '@/src/common/services/nftFiles';
import { NftFileData } from '@/src/common/types/data/NftData';
import { BaseResponse, isSuccessResponse } from '@/src/common/types/responses/baseResponse';
import { useRef, useState } from 'react'

export function UploadForm() {
  const [file, setFile] = useState<File>()
  const [uploading, setUploading] = useState<boolean>(false);
  const inputRef = useRef<any | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

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
        saveUploadedNftFileData(response.data)
        
      } else {
        throw new Error(response.message)
      }
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    } finally {
      inputRef.current.value = null
      setUploading(false)
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          ref={inputRef}
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        { uploading && <p>Uploading...</p>}
        <input type="submit" value="Upload" disabled={uploading} />

      </form>
    </>
  )
}