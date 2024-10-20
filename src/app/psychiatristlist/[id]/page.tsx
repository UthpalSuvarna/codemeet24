import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

export default async function Psychiatrist({ params }: { params: { id: string } }) {
    const session = await auth();
    const data = await prisma.psychiatrist.findUnique({
        where: {
            id: params.id
        },
        include: {
            user: true
        }
    });

    const booked = await prisma.patients.findUnique({
        where: {
            patientId: session?.user.id!,
            psychiatristId: data?.id

        }
    })

    if (!data) {
        return <div className="text-center pt-14">Psychiatrist not found</div>;
    }

    async function bookPsyc() {
        "use server"
        const result = await prisma.patients.create({
            data: {
                patientId: session?.user.id!,
                psychiatristId: data?.id!,
            }
        })
    }

    return (
        <div className="container mx-auto pt-14 px-4">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={data.user.image || `/placeholder.svg?height=80&width=80`} alt={data.user.name || ""} />
                        <AvatarFallback>{data?.user?.name?.slice(0, 2).toUpperCase() || "M"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl font-bold">{data.user.name}</CardTitle>
                        <p className="text-muted-foreground">Psychiatrist</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <span>{data.user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <span>{data.city}</span>
                    </div>
                    {data.clinicName && (
                        <div className="flex items-center gap-2">
                            <Building className="w-5 h-5 text-muted-foreground" />
                            <span>{data.clinicName}</span>
                        </div>
                    )}
                    <div className="pt-4">
                        <h3 className="text-lg font-semibold mb-2">About Me</h3>
                        <p className="text-muted-foreground">{data.aboutMe}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    {booked ? <>
                        You have booked a psychiatrist
                    </> : <>
                        <form action={bookPsyc} className="space-y-4 w-full">

                            <Button type="submit" className="w-full">
                                Book Appointment
                            </Button>
                        </form>

                    </>}
                </CardFooter>
            </Card>
        </div>
    );
}
