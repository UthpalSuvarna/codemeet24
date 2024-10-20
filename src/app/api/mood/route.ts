import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma";

export async function POST(req: NextResponse) {
    const data = await req.json();

    const rep = await prisma.mood.create({
        data: {
            mood: data.mood,
            userId: data.sessionId
        }
    })

    return NextResponse.json({
        message: "updated"
    })
}