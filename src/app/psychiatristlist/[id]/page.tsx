import { prisma } from "@/lib/prisma"

export default async function Psychiatrist({ params }: { params: { id: string } }) {
    const data = await prisma.psychiatrist.findUnique({
        where: {
            id: params.id
        },
        include: {
            user: true
        }
    })
    return (
        <>
            <div className="pt-14">
                <h1>{data?.user.name}</h1>
                <p>{data?.user.email}</p>
                <p>{data?.city}</p>
                <p>{data?.aboutMe}</p>
                <p>{data?.clinicName}</p>
            </div>
        </>
    )
}