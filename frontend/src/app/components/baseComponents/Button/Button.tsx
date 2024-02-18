import styles from './Button.module.css';
// import {Rarity, RarityBadge} from "@/src/app/components/baseComponents/RarityBadge/RarityBadge";
import Image from 'next/dist/shared/lib/image-external';

export type ButtonType = "primary" | "outlined";

export function Button({type, cl, onClick}: { type: ButtonType, cl?: string; onClick?: () => void }) {

    return (
        <button className={`${styles.generalButton} bg-${type}-static hover:bg-${type}Hover click:bg-${type}Click`}
                onClick={onClick}>
            <img/>{cl}
        </button>
    )
}
