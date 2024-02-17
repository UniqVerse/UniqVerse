import styles from './NftCard.module.css';
import {Rarity, RarityBadge} from "@/src/app/components/baseComponents/RarityBadge/RarityBadge";

export function NftCard({
                            imgSrc,
                            imgAlt,
                            nftName,
                            author,
                            rarity,
                            price,
                        }: Readonly<{
    imgSrc: string;
    imgAlt: string;
    nftName: string;
    author: string;
    rarity: Rarity;
    price: string;
}>) {

    return (
        <div className={"rounded-2xl w-60 flex flex-col bg-neutral10"}>
            <div className="top relative">
                <div className={"absolute top-1 left-1"}>
                    <RarityBadge rarity={rarity}/>
                </div>
                <img className={"rounded-2xl w-60"} src={imgSrc} alt={imgAlt}/>
            </div>
            <div className="bottom p-4 flex justify-between">
                <div className="names text-neutral40 flex flex-col">
                    <div className="name lable-large">{nftName}</div>
                    <div className="creator lable-small">{author}</div>
                </div>
                <div className="price lable-large flex h-3 gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.0795 2.73575C7.09261 2.71641 7.11751 2.69292 7.13455 2.68463C7.15815 2.67081 7.3705 2.66667 8.02721 2.66667C8.76781 2.66667 8.89496 2.66943 8.92904 2.68739C8.95788 2.70259 8.98016 2.73437 9.009 2.80069C9.03128 2.8532 9.44812 3.86736 10.8245 7.21934L12.0252 7.22625L12.0308 7.22628C13.2193 7.23316 13.2272 7.23321 13.2639 7.26218C13.2835 7.27737 13.3084 7.30639 13.3163 7.32435C13.3294 7.34922 13.3333 7.51226 13.3333 7.97513C13.3333 8.49741 13.3307 8.60104 13.3137 8.63558C13.3032 8.65769 13.2757 8.6867 13.2547 8.69775C13.2206 8.71572 13.0908 8.71848 12.3306 8.71848C11.8443 8.71848 11.4458 8.72124 11.4458 8.72539C11.4458 8.72953 11.8521 9.72435 12.3502 10.9361C12.8483 12.1478 13.2547 13.1551 13.2547 13.1744C13.2547 13.1938 13.2455 13.2283 13.235 13.2504C13.2245 13.2725 13.197 13.3016 13.176 13.3126C13.142 13.3306 13.0292 13.3333 11.59 13.3264L11.5572 13.2919C11.5349 13.2684 10.9818 11.8853 9.75484 8.78066C8.78223 6.31848 7.98133 4.30259 7.97609 4.30121C7.97084 4.29983 7.16995 6.29775 6.19602 8.74335C5.2221 11.1876 4.41595 13.209 4.40416 13.2366C4.39105 13.2629 4.36352 13.296 4.34124 13.3085C4.30454 13.332 4.24424 13.3333 3.58097 13.3333C2.99898 13.3333 2.85348 13.3292 2.82333 13.314C2.80367 13.3043 2.77745 13.2725 2.76434 13.2449C2.75255 13.2173 2.74206 13.1841 2.74206 13.1703C2.74206 13.1579 3.15496 12.1534 3.65962 10.9389C4.16428 9.72573 4.57718 8.72953 4.57718 8.72539C4.57718 8.72124 4.17346 8.71848 3.67928 8.71848C2.90722 8.71848 2.77614 8.71572 2.74206 8.69775C2.71978 8.6867 2.69356 8.65769 2.68307 8.63558C2.66603 8.59965 2.66341 8.50017 2.66997 7.32297L2.70274 7.28843C2.72109 7.26908 2.7591 7.24698 2.78794 7.24007C2.8194 7.23178 3.32143 7.22625 4.02271 7.22625C4.95862 7.22625 5.20768 7.22211 5.21161 7.20967C5.21423 7.2 5.63107 6.19689 6.13572 4.981C6.64169 3.76511 7.06639 2.7551 7.0795 2.73575Z"
                            fill="#3AF8CD"/>
                    </svg>
                    <span className={"text-primaryStatic"}>{price}</span>
                </div>
            </div>
        </div>
    )
}