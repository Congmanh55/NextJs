import accountApiRequest from "@/apiRequests/account";
import ProfileForm from "@/app/me/profile-form";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: 'Ho so nguoi dung'
};


export default async function MeProfile() {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('sessionToken')

    //Vi dung cookie nen API nay khong duoc cache tren server
    const result = await accountApiRequest.me(sessionToken?.value ?? '')

    return (
        <div>
            Xin chao name
            <ProfileForm profile={result.payload.data} />
        </div>
    )
}
