import {Rarity, RarityBadge} from "@/src/app/components/baseComponents/RarityBadge/RarityBadge";
import {NftCard} from "@/src/app/components/baseComponents/NftCard/NftCard";
import {ButtonType, Button} from "@/src/app/components/baseComponents/Button/Button";

export default function Design() {
    const badges = ["common", "uncommon", "rare", "epic", "legendary"].map((r) => {
        return <RarityBadge key={r} rarity={r as Rarity}/>
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
