import accountApiRequest from "@/apiRequests/account";
import Profile from "@/app/me/profile";
import envConfig from "@/config";
import { cookies } from "next/headers";

export default async function MeProfile() {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('sessionToken')

    const result = await accountApiRequest.me(sessionToken?.value ?? '')

    return (
        <div>
            XIn chao name
            {result?.payload?.data?.name}
            {/* <Profile /> */}
        </div>
    )
}
