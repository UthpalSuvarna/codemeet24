"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for patients
const patients = [
  { id: 1, name: "John Doe", age: 35, lastAppointment: "2023-05-15", nextAppointment: "2023-06-01", status: "Ongoing" },
  { id: 2, name: "Jane Smith", age: 28, lastAppointment: "2023-05-20", nextAppointment: "2023-06-10", status: "New" },
  { id: 3, name: "Bob Johnson", age: 42, lastAppointment: "2023-05-10", nextAppointment: "2023-05-31", status: "Ongoing" },
  { id: 4, name: "Alice Brown", age: 31, lastAppointment: "2023-05-18", nextAppointment: "2023-06-08", status: "Ongoing" },
  { id: 5, name: "Charlie Davis", age: 45, lastAppointment: "2023-05-22", nextAppointment: "2023-06-12", status: "New" },
]

export default function PsychiatristDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dr. Sarah Johnson's Patient Dashboard</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Last Appointment</TableHead>
            <TableHead>Next Appointment</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.lastAppointment}</TableCell>
              <TableCell>{patient.nextAppointment}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  patient.status === "New" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
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