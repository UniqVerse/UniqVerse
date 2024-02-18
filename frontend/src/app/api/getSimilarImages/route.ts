import weaviate from "weaviate-ts-client"
import {NextRequest, NextResponse} from "next/server"
import {NftFileData} from "@/src/common/types/data/NftData"
import {ErrorResponse} from "@/src/common/types/responses/baseResponse"

export async function POST(req: NextRequest) {
    const nftData = (await req.json()) as NftFileData
    console.log(nftData, process.env.VECTOR_DB_ADDRESS)
    if (!nftData.url) {
        return NextResponse.json<ErrorResponse>({success: false, message: 'We support only images for now'})
    }
    const blob = await fetch(nftData.url)
    const test = Buffer.from(await blob.arrayBuffer()).toString('base64')

    // const client = weaviate.client({
    //   scheme: 'http',
    //   host: process.env.VECTOR_DB_ADDRESS!,
    // })
    try {
        // const resImage = await client.graphql.get()
        //     .withClassName('NFTs')
        //     .withFields('name, _additional { id distance }')
        //     // .withFields('name, _additional { id distance }')
        //     .withNearImage({image: test, distance: 1})
        //     .do()
        // const query = `{
        //       Get {
        //         NFTs (nearImage(image: "${test}", distance: 1)) {
        //             name
        //             _additional {
        //               id
        //               distance
        //             }
        //         }
        //       }
        //     }`
        // const response = await fetch(
        //     `http://${process.env.VECTOR_DB_ADDRESS}:8080/v1/graphql`,
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             query
        //         }),
        //     });
        // const resImage = await response.json();
        const res = await fetch(`http://${process.env.VECTOR_DB_ADDRESS}:4000/similar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: test,
                // image: "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAExSURBVHgBzVJtTsJAEJ2Zmor6p94AbgB+JEYxKTfwBuINvAHxCNwAbsANqIniD6PFE+AR+q+F2BlnN11DkRL4x0s2s9l5u/ve2wXYa1ynH93beXy3iYNVjXYah4w8NnMS7rwcXUbreFR1ABPfa/nWkQh6PdhFwVUa1wl5BgJPBavnH9JphK1kKwUE3DXVBxqAl4/MfJHx40YF7fQ9dFIFpAksz5PjCxvgTfY5FpQmCk6tvRz7byetUUkBEgbF5rqWQMQb/ClC7msjKHrg0U/yT4GDvU2Jk9p5w62FEgeLOc8QcPpaO+uU7S7BhKebQ71tuLxuw2MYmp6xWnkAEdsMbHgrUBvWMyOVPhauyIw1vC8X3lp7GqbvU8M96UGJoe/uoxdBBXLBBxK1mIEJPIG9wC+3OH4lR1cLEgAAAABJRU5ErkJggg==",
                distance: 1,
            }),
        });
        // the line above as curl command: curl -X POST -H "Content-Type: application/json" -d '{"image": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAExSURBVHgBzVJtTsJAEJ2Zmor6p94AbgB+JEYxKTfwBuINvAHxCNwAbsANqIniD6PFE+AR+q+F2BlnN11DkRL4x0s2s9l5u/ve2wXYa1ynH93beXy3iYNVjXYah4w8NnMS7rwcXUbreFR1ABPfa/nWkQh6PdhFwVUa1wl5BgJPBavnH9JphK1kKwUE3DXVBxqAl4/MfJHx40YF7fQ9dFIFpAksz5PjCxvgTfY5FpQmCk6tvRz7byetUUkBEgbF5rqWQMQb/ClC7msjKHrg0U/yT4GDvU2Jk9p5w62FEgeLOc8QcPpaO+uU7S7BhKebQ71tuLxuw2MYmp6xWnkAEdsMbHgrUBvWMyOVPhauyIw1vC8X3lp7GqbvU8M96UGJoe/uoxdBBXLBBxK1mIEJPIG9wC+3OH4lR1cLEgAAAABJRU5ErkJggg==", "distance": 1}' http://localhost:4000/similar
        const resImage = await res.json();
        console.log(resImage)
        return NextResponse.json({
            success: true,
            data: resImage
        })
    } catch (e: any) {
        console.error(e)
        return NextResponse.json<ErrorResponse>({success: false, message: e.message})
    }
}
