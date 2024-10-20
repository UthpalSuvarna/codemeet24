import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const data = await req.json()

    const rep = await prisma.journals.create({
        data: {
            text: data.content,
            userId: data.sessionId

        }
    })

    return NextResponse.json({
        message: "hello"
    })

}