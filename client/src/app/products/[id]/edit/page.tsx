import productApiRequest from '@/apiRequests/product'
import React, { cache } from 'react'
import Image from 'next/image'
import { Metadata, ResolvingMetadata } from 'next'

const getDetail = cache(productApiRequest.getDetail)

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { payload } = await getDetail(Number(params.id))
    const product = payload.data

    return {
        title: 'Edit san pham ' + product.name,
        description: product?.description
    }
}

export default async function ProductEdit({
    params
}: {
    params: { id: string }
}) {
    let product = null
    try {
        const { payload } = await getDetail(Number(params.id))
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
