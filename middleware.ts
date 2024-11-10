import { NextRequest, NextResponse } from "next/server"
import {getSession, getToken} from "./lib/session"
import {isAuthorized} from "@/lib/api";

export default async function middleware(req: NextRequest) {
    const token= await getToken()
    const session = await getSession()
    const emailSent = req.cookies.get("emailSent"); // Obtenemos la cookie

    if (!session?.email && !session?.email) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    //Passing the token as parameter because of session problem with cookies
    const completeInfo= await isAuthorized(token!!)
    if (completeInfo.status != 200 && session.role !=="ADMIN"){
        return NextResponse.redirect(new URL('/complete-profile', req.nextUrl))
    }

    if (req.nextUrl.pathname === "/recover-password/verification" && !emailSent) {
        return NextResponse.redirect(new URL("/recover-password", req.nextUrl));
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/home','/submit-project','/projects','/portfolio','/profile'],
}