import { auth } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

// export const middleware = function(req){
    
//     return NextResponse.redirect(new URL('/login',req.url))
// }


export const middleware = auth;

export const config = {
    matcher:['/']
}
