import envConfig from "@/config";
import { normalizePath } from "@/lib/utils";
import { LoginResType } from "@/schemaValidations/auth.schema";
import { redirect } from "next/navigation";

type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined
}

const ENTITY_ERROR_STATUS = 422
const AUTHENTICOTION_ERROR_STATUS = 401

type EntityErrorPayload = {
    message: string,
    errors: {
        field: string,
        message: string
    }[]
}

export class HttpError extends Error {
    status: number;
    payload: {
        message: string,
        [key: string]: any
    };

    constructor({ status, payload }: { status: number, payload: any }) {
        super('Http Eror')
        this.status = status
        this.payload = payload
    }
}

export class EntityError extends HttpError {
    status: 422;
    payload: EntityErrorPayload

    constructor({ status, payload }: { status: 422, payload: EntityErrorPayload }) {
        super({ status, payload })
        if (status !== ENTITY_ERROR_STATUS) {
            throw new Error('EntityError must have status 422')
        }
        this.status = status
        this.payload = payload
    }

}

class SessionToken {
    private token = ''
    get value() {
        return this.token
    }
    set value(token: string) {
        //Neu goi method nay o server thi se bi loi 
        if (typeof window === 'undefined') {
            throw new Error('Cannot set token on server side')
        }
        this.token = token
    }
}

export const clientSessionToken = new SessionToken()
let clientLogoutRequest: null | Promise<any> = null;

const request = async (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options?: CustomOptions | undefined
) => {
    const body = options?.body ? JSON.stringify(options.body) : undefined
    const baseHeaders = {
        'Content-Type': 'application/json',
        Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ''
    }
    //Neu khong truyen baseUrl hoac baseUrl = undefined
    const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers
        },
        body,
        method
    })
    const payload = await res.json()
    const data = {
        status: res.status,
        payload
    }
    if (!res.ok) {
        if (res.status === ENTITY_ERROR_STATUS) {
            throw new EntityError(data as {
                status: 422,
                payload: EntityErrorPayload
            })
        } else if (res.status === AUTHENTICOTION_ERROR_STATUS) {
            if (typeof window !== 'undefined') {
                clientLogoutRequest = fetch('/api/auth/logout', {
                    method: 'POST',
                    body: JSON.stringify({ force: true }),
                    headers: {
                        ...baseHeaders,
                    }
                })
                await clientLogoutRequest
                clientSessionToken.value = ''
                clientLogoutRequest = null
                console.log('Da dang xuat')
                location.href = '/login'
            } else {
                const sessionToken = (options?.headers as any).Authorization.split('Bearer ')[1]
                redirect(`/logout?sessionToken=${sessionToken}`)
            }
        } else {
            throw new HttpError(data)
        }
    }

    // Dam bao logiv duoi day chi chay o phia client (brower)
    if (typeof window !== 'undefined') {
        if (['auth/login', 'auth/register'].some((item) => item === normalizePath(url))) {
            clientSessionToken.value = (payload as LoginResType).data.token
        } else if ('auth/logout' === normalizePath(url)) {
            clientSessionToken.value = ''
        }
    }

    return data;
}

const http = {
    get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request('GET', url, options)
    },
    post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request('POST', url, { ...options, body })
    },
    put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request('PUT', url, { ...options, body })
    },
    delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
        return request('DELETE', url, { ...options, body })
    },
}

export default http;
