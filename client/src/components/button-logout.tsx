'use client'

import authApiRequest from '@/apiRequests/auth'
import { useAppContext } from '@/app/app-provider'
import { Button } from '@/components/ui/button'
import { handleErrorApi } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

const ButtonLogout = () => {
    const { user } = useAppContext()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await authApiRequest.logoutFromNextClientToNextServer();
            router.push('/login')
        } catch (error) {
            handleErrorApi({
                error
            })
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Button size={'sm'} onClick={handleLogout}>
                Dang xuat
            </Button>
        </div>
    )
}

export default ButtonLogout