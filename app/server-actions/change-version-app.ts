"use server"

import { cookies } from "next/headers"
import { COOKIE_KEYS } from "../constants/cookies";

export async function setVersionApp(value:boolean) {
    const cookieStore = await cookies();
    cookieStore.set(`${COOKIE_KEYS.VERSION}`, value.toString(), {
        httpOnly: false,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 4 * 30 * 24 * 60 * 60, // 4 meses
    })

    return { success: true, version: value ? "light" : "full" };

}