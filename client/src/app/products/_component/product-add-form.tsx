"use client"

import React, { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema';
import { useToast } from '@/hooks/use-toast';
import authApiRequest from '@/apiRequests/auth';
import { useRouter } from 'next/navigation';
import { clientSessionToken } from '@/lib/http';
import { handleErrorApi } from '@/lib/utils';
import productApiRequest from '@/apiRequests/product';
import { CreateProductBody, CreateProductBodyType, ProductResType, UpdateProductBodyType } from '@/schemaValidations/product.schema';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

type Product = ProductResType['data']

const ProductAddForm = ({
    product
}: { product?: Product }) => {
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<CreateProductBodyType>({
        resolver: zodResolver(CreateProductBody),
        defaultValues: {
            name: product?.name ?? '',
            price: product?.price ?? 0,
            description: product?.description ?? '',
            image: product?.image ?? ''
        },
    })
    const image = form.watch('image')

    const createProduct = async (values: CreateProductBodyType) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('file', file as Blob)
            const uploadImageResult = await productApiRequest.uploadImage(formData) || null
            const imageUrl = uploadImageResult.payload.data;

            const result = await productApiRequest.create({
                ...values,
                image: imageUrl
            })

            toast({
                description: result.payload.message
            })

            router.push('/products')
            router.refresh()

        } catch (error: any) {
            handleErrorApi({
                error,
                setError: form.setError
            })
        } finally {
            setLoading(false)
        }
    }

    const updateProduct = async (_values: UpdateProductBodyType) => {
        if (!product) return
        setLoading(true)
        let values = _values
        try {
            if (file) {
                const formData = new FormData()
                formData.append('file', file as Blob)
                const uploadImageResult = await productApiRequest.uploadImage(formData) || null
                const imageUrl = uploadImageResult.payload.data;
                values = {
                    ...values,
                    image: imageUrl
                }
            }

            const result = await productApiRequest.update(product?.id, values)

            toast({
                description: result.payload.message
            })
            router.refresh()

        } catch (error: any) {
            handleErrorApi({
                error,
                setError: form.setError
            })
        } finally {
            setLoading(false)
        }
    }

    // 2. Define a submit handler.
    async function onSubmit(values: CreateProductBodyType) {
        if (loading) return
        if (product) {
            await updateProduct(values)
        } else {
            await createProduct(values)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, (error) => {
                    console.log(error)
                    console.log(form.getValues('image'))
                })}
                className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
                noValidate
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ten</FormLabel>
                            <FormControl>
                                <Input placeholder="Ten" type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gia</FormLabel>
                            <FormControl>
                                <Input placeholder="Gia" type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mo ta</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Mo ta" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hifnh anh</FormLabel>
                            <FormControl>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    ref={inputRef}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            setFile(file)
                                            field.onChange('http://localhost:3000/' + file.name)
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {(file || image) && (
                    <div>
                        <Image
                            src={file ? URL.createObjectURL(file) : image}
                            width={128}
                            height={128}
                            alt='preview'
                            className='w-32 h-32 object-cover'
                        />
                        <Button type='button' variant={'destructive'} size={'sm'}
                            onClick={() => {
                                setFile(null)
                                form.setValue('image', '')
                                if (inputRef.current) {
                                    inputRef.current.value = ''
                                }
                            }}
                        >
                            Xoa hifnh anh
                        </Button>
                    </div>

                )}

                <Button type="submit" className='!mt-8 w-full'>
                    {product ? 'Cap nhat san pham' : 'Them san pham'}
                </Button>
            </form>
        </Form>
    );
}

export default ProductAddForm;
