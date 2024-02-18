import styles from './RarityBadge.module.css';
import {RarityEnum} from "@/src/common/services/rarity";

export function RarityBadge({rarity, cl}: { rarity: RarityEnum, cl?: string }) {
    return (
        <div className={`${styles.rarityBadge} bg-rarity-${rarity}-2 ${cl}`}>
            <span className={`rarity-${rarity}`}>{rarity}</span>
        </div>
    )
}
