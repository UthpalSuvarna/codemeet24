
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

// Mock data for psychiatrists
const psychiatrists = [
  {
    id: 1,
    name: "Dr. Emily Johnson",
    specialty: "Cognitive Behavioral Therapy",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Emily Johnson is a licensed psychiatrist specializing in Cognitive Behavioral Therapy. With over 10 years of experience, she has helped numerous patients overcome anxiety, depression, and other mental health challenges.",
    education: "M.D. from Harvard Medical School",
    contact: "emily.johnson@example.com"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Child and Adolescent Psychiatry",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Michael Chen is an expert in child and adolescent psychiatry. He is passionate about helping young individuals and their families navigate mental health issues and developmental challenges.",
    education: "M.D. from Stanford University School of Medicine",
    contact: "michael.chen@example.com"
  },
  {
    id: 3,
    name: "Dr. Sarah Patel",
    specialty: "Addiction Psychiatry",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Sarah Patel specializes in addiction psychiatry and has extensive experience in treating substance use disorders. She takes a compassionate, holistic approach to helping patients overcome addiction and rebuild their lives.",
    education: "M.D. from Johns Hopkins University School of Medicine",
    contact: "sarah.patel@example.com"
  },
  {
    id: 4,
    name: "Dr. David Rodriguez",
    specialty: "Geriatric Psychiatry",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. David Rodriguez is a geriatric psychiatrist with a focus on mental health issues affecting older adults. He is committed to improving the quality of life for seniors through personalized psychiatric care.",
    education: "M.D. from Yale School of Medicine",
    contact: "david.rodriguez@example.com"
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Mood Disorders",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. Lisa Thompson is an expert in treating mood disorders, including depression and bipolar disorder. She combines evidence-based treatments with a patient-centered approach to achieve the best outcomes for her patients.",
    education: "M.D. from Columbia University Vagelos College of Physicians and Surgeons",
    contact: "lisa.thompson@example.com"
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialty: "PTSD and Trauma",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. James Wilson specializes in treating PTSD and trauma-related disorders. He has worked extensively with veterans and survivors of various traumatic experiences, helping them on their path to recovery.",
    education: "M.D. from University of California, San Francisco School of Medicine",
    contact: "james.wilson@example.com"
  }
]



export default async function PsychiatristDirectory() {

  const psychiatrists = await prisma.psychiatrist.findMany({
    include: {
      user: true
    }
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center pt-20">Psychiatrist Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {psychiatrists.map((psychiatrist) => (

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={psychiatrist.user.image ?? ""} alt={psychiatrist.user.name ?? ""} />
                <AvatarFallback>{psychiatrist.clinicName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{psychiatrist.user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{psychiatrist.user.email}</p>
              </div>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href={`psychiatristlist/${psychiatrist.id}`}>Know More</Link>
              </Button>
            </CardFooter>
          </Card>

        ))}
      </div>
    </div>
  )
}