import productApiRequest from '@/apiRequests/product'
import React from 'react'
import Image from 'next/image'

export default async function ProductDetail({
    params
}: {
    params: { id: string }
}) {
    let product = null
    try {
        const { payload } = await productApiRequest.getDetail(Number(params))
        product = payload.data
    } catch (error) {

    }
    return (
        <div>
            {!product && <div>Khong tim thay san pham</div>}
            {product && <div>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={180}
                    className='w-32 h-32 object-cover'
                />

                <h3>{product.name}</h3>
                <div>{product.price}</div>

            </div>}
        </div >
    )
}
