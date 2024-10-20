
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

  const patients = await prisma.patients.findMany({
    where: {
      psychiatristId: psychiatrist?.userId,

    },
    include: {
      user: true

    }
  })






  return (
    <div className="container mx-auto p-6 pt-16">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dpatients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${patient.status === "New" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}>
                  {patient.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}