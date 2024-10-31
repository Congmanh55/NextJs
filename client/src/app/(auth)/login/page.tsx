import LoginForm from '@/app/(auth)/login/login-form';
import React from 'react'

const LoginPage = () => {
    return (
        <div>
            <h1 className="text-xl font-semibold text-center">Dang ky</h1>
            <div className="flex justify-center">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage;
