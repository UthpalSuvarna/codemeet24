import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();

    const rep = await prisma.journals.create({
        data: {
            text: data.content,
            userId: data.sessionId,
        },
    });

    const sending = { inputs: data.content };
    const response = await fetch(
        "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
        {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(sending),
        }
    );
    const result = await response.json();
    console.log(result[0][0].label);

    const updateStatus = await prisma.status.upsert({
        where: {
            userId: data.sessionId,
        },
        update: {
            status: result[0][0].label,
        },
        create: {
            status: result[0][0].label,
            userId: data.sessionId,
        },
    });

    return NextResponse.json({
        message: "hello",
    });
}
