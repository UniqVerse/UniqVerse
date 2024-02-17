import { NftFileData } from "../types/data/NftData";

const nftFileIdKey = 'nftFileId'
export const saveUploadedNftFileData = (nft: NftFileData) => {
    localStorage.setItem(nftFileIdKey, JSON.stringify(nft));
}
export const getUploadedNftFileData = () => {
    const data = localStorage.getItem(nftFileIdKey)
    if (!data) return null;
    return JSON.parse(data) as NftFileData;
}