export type RarityEnum = "common" | "uncommon" | "rare" | "epic" | "legendary";
export type Rarity = {
    rarity: RarityEnum
    percentage: number
}
export function distanceToSimilarityPercent(distance: number): number {
    // distance is a number between 0 and 1. The lower the distance, the more similar the images
    // let's think step by step: 1 - distance = similarity. We want to convert similarity to percentage.
    // similarity * 100 = percentage
    // the final formula is: (1 - distance) * 100
    // the implementation is:
    return (1 - distance) * 100
}
export function distanceToRarity(distance: number): Rarity {
    // distance is a number between 0 and 1. The lower the distance, the more similar the images are
    // the formula to calculate percentage: 100 - distance * 100
    const percentage = 100 - distance * 100
    if (percentage >= 90) {
        return {rarity: "legendary", percentage}
    }
    if (percentage >= 80) {
        return {rarity: "epic", percentage}
    }
    if (percentage >= 70) {
        return {rarity: "rare", percentage}
    }
    if (percentage >= 60) {
        return {rarity: "uncommon", percentage}
    }
    return {rarity: "common", percentage}
}
