import productApiRequest from '@/apiRequests/product'
import ProductAddForm from '@/app/products/_component/product-add-form'
import envConfig from '@/config'
import { Metadata } from 'next'
import React, { cache } from 'react'

const getDetail = cache(productApiRequest.getDetail)

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { payload } = await getDetail(Number(params.id))
    const product = payload.data
    const url = envConfig.NEXT_PUBLIC_URL + '/products/' + product.id

    return {
        title: product.name,
        description: product?.description,
        openGraph: {
            title: product.name,
            description: product?.description,
            url,
            siteName: 'Productic Company',
            images: [
                {
                    url: product.image
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        alternates: {
            canonical: url
        }
    }
}


const ProductDetail = async (
    { params }: { params: { id: string } }
) => {
    let product = undefined
    try {
        const { payload } = await getDetail(Number(params.id))
        product = payload?.data
    } catch (error) {
        console.log(error)
    }

    return (
        <div>
            {!product && <div>Khong tim thay san pham</div>}
            {product && <ProductAddForm product={product} />}
        </div>
    )
}

export default ProductDetail