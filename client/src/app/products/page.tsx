import productApiRequest from '@/apiRequests/product'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductPageList = async () => {
    const { payload } = await productApiRequest.getList()
    const productList = payload.data
    return (
        <div className='space-y-3'>
            <h1>Product List</h1>
            <Link href={'/products/add'}>
                <Button variant={'secondary'}>Them San pham</Button>
            </Link>
            <div className='space-y-5'>
                {productList.map((product: any) => (
                    <div key={product.id} className='flex space-x-4'>
                        <div>
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={180}
                                height={180}
                                className='w-32 h-32 object-cover'
                            />
                            <h3>{product.name}</h3>
                            <div>{product.price}</div>
                            <div className='flex space-x-2'>
                                <Link href={`/products/${product.id}`}>
                                    <Button>Edit</Button>
                                </Link>
                                <Button variant={'destructive'}>Delete</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductPageList