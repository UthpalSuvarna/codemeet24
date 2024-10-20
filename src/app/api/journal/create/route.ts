import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();

    // Create journal entry
    const journal = await prisma.journals.create({
        data: {
            text: data.content,
            userId: data.sessionId,
        },
    });

    // Analyze emotion using Hugging Face API
    const emotionResponse = await fetch(
        "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
        {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: data.content }),
        }
    );
    const emotionResult = await emotionResponse.json();
    const detectedEmotion = emotionResult[0][0].label;

    // Update user's emotional status
    // const updatedStatus = await prisma.user.upsert({
    //     where: { id: data.sessionId },
    //     update: { status: detectedEmotion },
    // });

    const updatedStatus = await prisma.user.update({
        where: {
            id: data.sessionId,
        },
        data: {
            status: detectedEmotion
        }
    })

    return NextResponse.json({
        message: "Journal entry created and emotion analyzed successfully",
        journalId: journal.id,
        detectedEmotion: detectedEmotion,
        updatedStatus: updatedStatus,
    });
}
