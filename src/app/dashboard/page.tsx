
import { auth } from "@/auth"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { prisma } from "@/lib/prisma"

// Mock data for patients
const dpatients = [
  { id: 1, name: "John Doe", age: 35, lastAppointment: "2023-05-15", nextAppointment: "2023-06-01", status: "Ongoing" },
  { id: 2, name: "Jane Smith", age: 28, lastAppointment: "2023-05-20", nextAppointment: "2023-06-10", status: "New" },
  { id: 3, name: "Bob Johnson", age: 42, lastAppointment: "2023-05-10", nextAppointment: "2023-05-31", status: "Ongoing" },
  { id: 4, name: "Alice Brown", age: 31, lastAppointment: "2023-05-18", nextAppointment: "2023-06-08", status: "Ongoing" },
  { id: 5, name: "Charlie Davis", age: 45, lastAppointment: "2023-05-22", nextAppointment: "2023-06-12", status: "New" },
]

export default async function PsychiatristDashboard() {
  const session = await auth();

  const psychiatrist = await prisma.psychiatrist.findFirst({
    where: {
      userId: session?.user.id
    },
    include: {
      user: true
    }
  })

  console.log(psychiatrist)

  const patients = await prisma.patients.findMany({
    where: {
      psychiatristId: psychiatrist?.id,

    },
    include: {
      user: true

    }
  })

  console.log(patients)





  return (
    <div className="container mx-auto p-6 pt-20 md:mx-32">
      <div className="text-2xl text-foreground font-bold">Dashboard for {psychiatrist?.user.name}</div>
      <div className="">
        <Table >
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.user.name}</TableCell>
                <TableCell>
                  {patient.user.status}
                </TableCell>
                <TableCell>{patient.user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}