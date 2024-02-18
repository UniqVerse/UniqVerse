import {NftFileData} from "../types/data/NftData"

const nftFileIdKey = 'nftFileId'
export const saveUploadedNftFileData = (nft: NftFileData) => {
    if (typeof localStorage === 'undefined') throw new Error('localStorage is not available')
    localStorage.setItem(nftFileIdKey, JSON.stringify(nft))
}
export const getUploadedNftFileData = () => {
    if (typeof localStorage === 'undefined') throw new Error('localStorage is not available')
    const data = localStorage.getItem(nftFileIdKey)
    if (!data) return null
    return JSON.parse(data) as NftFileData
}

export const existsUploadedNftFileData = () => {
    if (typeof localStorage === 'undefined') throw new Error('localStorage is not available')
    return !!localStorage.getItem(nftFileIdKey)
}

export const removeUploadedNftFileData = async () => {
    if (typeof localStorage === 'undefined') throw new Error('localStorage is not available')
    localStorage.removeItem(nftFileIdKey)
}
