import accountApiRequest from "@/apiRequests/account";
import Profile from "@/app/me/profile";
import ProfileForm from "@/app/me/profile-form";
import envConfig from "@/config";
import { cookies } from "next/headers";

export default async function MeProfile() {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('sessionToken')

    //Vi dung cookie nen API nay khong duoc cache tren server
    const result = await accountApiRequest.me(sessionToken?.value ?? '')

    return (
        <div>
            XIn chao name
            <ProfileForm profile={result.payload.data} />
        </div>
    )
}
