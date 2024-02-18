import styles from './Button.module.css';
// import {Rarity, RarityBadge} from "@/src/app/components/baseComponents/RarityBadge/RarityBadge";
import Image from 'next/dist/shared/lib/image-external';



export type ButtonType = "primary" | "outlined";

export function Button({type, cl, onClick}: { type: ButtonType, cl?: string; onClick?: () => void }) {

    const staticClassName = `${styles.generalButton} ${styles[`${type}-static`]}`;
    const hoverClassName = styles[`${type}-hover`];
    const clickClassName = styles[`${type}-click`];

    const classNames = `${staticClassName} ${hoverClassName} ${clickClassName}`;

    const textColor = type === 'primary' ? 'black' : type === 'outlined' ? 'white' : 'inherit';


    return (
        <button className={classNames} style={{ color: textColor }} onClick={onClick}>
            {cl}
        </button>
    )
}
