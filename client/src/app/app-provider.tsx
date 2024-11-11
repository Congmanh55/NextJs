'use client'

import { clientSessionToken } from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
import { createContext, useContext, useState } from "react";

type User = AccountResType['data']

const AppContext = createContext<{
    user: User | null,
    setUser: (user: User | null) => void
}>({
    user: null,
    setUser: () => { }
})

export const useAppContext = () => {
    const context = useContext(AppContext)
    return context
}

export default function AppProvider({
    children,
    inititalSessionToken = '',
    user: userProp
}: {
    children: React.ReactNode,
    inititalSessionToken?: string,
    user: User | null
}) {
    const [user, setUser] = useState<User | null>(userProp)
    //Co tac dung chajy trong qua tronh render func chi chay 1 lan duy nhat
    useState(() => {
        if (typeof window !== 'undefined') {
            clientSessionToken.value = inititalSessionToken;
        }
    })

    return (
        <AppContext.Provider
            value={{
                user, setUser
            }}>
            {children}
        </AppContext.Provider>
    )
}