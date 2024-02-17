import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { put } from "@vercel/blob";
import { BaseResponse } from '@/src/common/types/responses/baseResponse';
import { NftFileData } from '@/src/common/types/data/NftData';
const CryptoJS = require('crypto-js');

// we use server component, don't use it. 
export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ success: false, error: 'We support only images for now' })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location

  //   const path = `/tmp/${file.name}`
  //   await writeFile(path, buffer)
  //   console.log(`open ${path} to see the uploaded file`)
  // const fileHash = CryptoJS.SHA256(CryptoJS.enc.Hex.parse(buffer)).toString();
  const fileHash = CryptoJS.SHA256(buffer).toString(CryptoJS.enc.Hex);

  // const q = await put(`nfts/${fileHash}`, buffer, { access: 'public' });
  // console.log(q);
  // const { url } = q;
  const { url } = await put(`nfts/${fileHash}`, buffer, { access: 'public', addRandomSuffix: false, contentType: file.type });
  console.log(`File uploaded to ${url}`)

  return NextResponse.json<BaseResponse<NftFileData>>({ success: true, data: {url, id: fileHash} })
}