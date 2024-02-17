import {Rarity, RarityBadge} from "@/src/app/components/baseComponents/RarityBadge/RarityBadge";
import {NftCard} from "@/src/app/components/baseComponents/NftCard/NftCard";
import { FilledPrimaryButton } from "../components/baseComponents/Button/FilledPrimaryButton/FilledPrimaryButton";
import { TextPrimaryButton } from "../components/baseComponents/Button/TextPrimaryButton/TextPrimaryButton";
import { OutlinedNeutralButton } from "../components/baseComponents/Button/OutlinedNeutralButton/OutlinedNeutralButton";

import {ButtonType, Button} from "@/src/app/components/baseComponents/Button/Button";
import handleClickPrimaryButton from "./testFunction";

export default function Design() {
    const badges = ["common", "uncommon", "rare", "epic", "legendary"].map((r) => {
        return <RarityBadge rarity={r as Rarity}/>
    });


    return (
        <>
            <div>
                <h1>Rarities</h1>
                {badges}

                <h1>Nft Card</h1>
                <NftCard
                    author={"Some author"}
                    imgAlt={"alt text for image"}
                    imgSrc={"https://via.placeholder.com/150"}
                    nftName={"Some NFT name"}
                    rarity={"legendary"}
                    price={"500,000"}/>
            
                    <h1>FilledPrimaryButton</h1> 
                    <Button type={"primary"} cl="text_primary" ></Button>

                    <h1>OutlinedNeutralButton</h1> 
                    <Button type={"outlined"} cl="outlined" ></Button>

            </div>
        </>
    )
}
