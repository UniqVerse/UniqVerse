"use client"
import { PublishNft } from "../publishNft/publishNft"
import { SearchResult } from "../searchResult/SearchResult"
import { UploadForm } from "../uploadFile/UploadForm"

export function ValidateAndPublishNft() {
  const steps: Record<string, JSX.Element> = {
    "upload": <UploadForm/>,
    "searchResult": <SearchResult/>,
    "publishNft": <PublishNft/>,
  }
  const def = steps["upload"]
  const hash = window.location.hash ? window.location.hash.slice(1) : "upload"
  console.log(hash)
  console.log(steps[hash])
  return (
    <>

      {!!steps[hash] ? steps[hash] : def}
    </>
  )
}