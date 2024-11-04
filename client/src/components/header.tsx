import ButtonLogout from '@/components/button-logout';
import ModeToggle from '@/components/mode-toggle';
import Link from 'next/link';
import React from 'react'

const Header = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link href={'/products/add'}>
                        Them san pham
                    </Link>
                </li>
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
                <li>
                    <ButtonLogout />
                </li>
            </ul>
            <ModeToggle />
        </div>
    )
}

export default Header;
