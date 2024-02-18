export default function MarketplacePreview() {
    return (
        <div className={'flex flex-col gap-6'}>
            <img src={'chains-list.png'} alt={'Chains list'}/>
            <h1 className={"display-large-bold"}>Your gateway to authentic content across blockchains</h1>
            <ul className={"list-disc pl-5"}>
                <li>Scan and check the uniqueness of content among blockchains</li>
                <li>Find primary sources and authentic original content</li>
                <li>Use AI-based powerful cross-content search engine</li>
            </ul>
            <img src={'carousel.png'} alt={'Carousel'}/>
        </div>
    )
}
