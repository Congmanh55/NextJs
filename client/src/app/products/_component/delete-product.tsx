'use client'

import { Button } from '@/components/ui/button'
import { ProductResType } from '@/schemaValidations/product.schema'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React from 'react'
import productApiRequest from '@/apiRequests/product'
import { handleErrorApi } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const DeleteProduct = ({ product }: { product: ProductResType['data'] }) => {
    const { toast } = useToast()
    const router = useRouter()

    const deleteProduct = async () => {
        try {
            const result = await productApiRequest.delete(product.id)
            toast({
                description: result.payload.message
            })

            router.refresh()

        } catch (error) {
            handleErrorApi({ error })
        }
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={'destructive'}>Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ban co muon xoa san pham khong?</AlertDialogTitle>
                        <AlertDialogDescription>
                            San pham &rdquo;{product.name}&rdquo; se bi xoa vinh vien!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteProduct}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


        </div>
    )
}

export default DeleteProduct