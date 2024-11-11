import ButtonLogout from '@/components/button-logout';
import ModeToggle from '@/components/mode-toggle';
import { AccountResType } from '@/schemaValidations/account.schema';
import Link from 'next/link';
import React from 'react';

const Header = async ({
    user
}: {
    user: AccountResType['data'] | null
}) => {

    return (
        <div className='flex space-x-4 '>
            <ul className='flex space-x-4'>
                <li>
                    <Link href={'/products'}>
                        San pham
                    </Link>
                </li>
                {user ? (
                    <>
                        <Link href={'/me'}>
                            <div>Xin chào <strong>{user.name}</strong></div>
                        </Link>
                        <li>
                            <ButtonLogout />
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href={'/login'}>
                                Dang nhap
                            </Link>
                        </li>
                        <li>
                            <Link href={'/register'}>
                                Dang ky
                            </Link>
                        </li>
                    </>
                )}


            </ul>
            <ModeToggle />
        </div>
    )
}

export default Header;
