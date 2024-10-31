import React from 'react';

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): any {
    return (
        <main>
            {children}
        </main>
    );
}