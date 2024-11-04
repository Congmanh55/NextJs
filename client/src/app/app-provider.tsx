'use client'

import { clientSessionToken } from "@/lib/http";
import { useState } from "react";

export default function AppProvider({
    children,
    inititalSessionToken = ''
}: {
    children: React.ReactNode,
    inititalSessionToken?: string
}) {
    //Co tac dung chajy trong qua tronh render func chi chay 1 lan duy nhat
    useState(() => {
        if (typeof window !== 'undefined') {
            clientSessionToken.value = inititalSessionToken;
        }
    })

    return (
        <>
            {children}
        </>
    )
}