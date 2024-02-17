import styles from './RarityBadge.module.css';

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export function RarityBadge({rarity, cl}: { rarity: Rarity, cl?: string }) {
    return (
        <div className={`${styles.rarityBadge} bg-rarity-${rarity}-2 ${cl}`}>
            <span className={`rarity-${rarity}`}>{rarity}</span>
        </div>
    )
}
