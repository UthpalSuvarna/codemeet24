import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Mail, Building } from "lucide-react"

export default async function Psychiatrist({ params }: { params: { id: string } }) {
  const data = await prisma.psychiatrist.findUnique({
    where: {
      id: params.id
    },
    include: {
      user: true
    }
  })

  if (!data) {
    return <div className="text-center pt-14">Psychiatrist not found</div>
  }

  return (
    <div className="container mx-auto pt-14 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={data.user.image || `/placeholder.svg?height=80&width=80`} alt={data.user.name} />
            <AvatarFallback>{data.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
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
      </Card>
    </div>
  )
}