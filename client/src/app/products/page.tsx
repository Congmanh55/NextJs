import productApiRequest from '@/apiRequests/product'
import DeleteProduct from '@/app/products/_component/delete-product'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: 'Danh sach san pham ',
    description: 'Danh sach san pham cua Productic, duoc tao boi See_M'
}

const ProductPageList = async () => {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('sessionToken')
    const isAuthenticated = Boolean(sessionToken)
    const { payload } = await productApiRequest.getList()
    const productList = payload.data
    return (
        <div className='space-y-3'>
            <h1>Product List</h1>
            {isAuthenticated && (
                <Link href={'/products/add'}>
                    <Button variant={'secondary'}>Them San pham</Button>
                </Link>
            )}

            <div className='space-y-5'>
                {productList.map((product: any) => (
                    <div key={product.id} className='flex space-x-4'>
                        {/* <div> */}
                        <Link href={`/products/${product.id}`}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={180}
                                height={180}
                                className='w-32 h-32 object-cover'
                            />
                        </Link>

                        <h3>{product.name}</h3>
                        <div>{product.price}</div>
                        {isAuthenticated && (
                            <div className='flex space-x-2 items-start'>
                                <Link href={`/products/${product.id}/edit`}>
                                    <Button variant={'outline'}>Edit</Button>
                                </Link>
                                <DeleteProduct product={product} />
                            </div>
                        )}

                        {/* </div> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductPageList