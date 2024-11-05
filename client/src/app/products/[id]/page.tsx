import productApiRequest from '@/apiRequests/product'
import ProductAddForm from '@/app/products/_component/product-add-form'
import React from 'react'

const ProductEdit = async (
    { params }: { params: { id: string } }
) => {
    let product = undefined
    try {
        const { payload } = await productApiRequest.getDetail(Number(params.id))
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

export default ProductEdit