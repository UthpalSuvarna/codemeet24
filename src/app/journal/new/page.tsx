"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, Edit } from "lucide-react"

interface Note {
  id: number
  date: string
  content: string
}

export default function NoteTakingApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [content, setContent] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addNote()
  }

  const addNote = () => {
    if (content.trim()) {
      if (editingId !== null) {
        setNotes(notes.map(note => 
          note.id === editingId ? { ...note, content } : note
        ))
        setEditingId(null)
      } else {
        const currentDate = new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        setNotes([...notes, { id: Date.now(), date: currentDate, content }])
      }
      setContent("")
    }
  }

  const editNote = (id: number) => {
    const noteToEdit = notes.find(note => note.id === id)
    if (noteToEdit) {
      setContent(noteToEdit.content)
      setEditingId(id)
    }
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Note Taking App</h1>
      <Card className="mb-6">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{editingId !== null ? "Edit Note" : "Add New Note"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">
              {editingId !== null ? "Update Note" : "Add Note"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {note.date}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{note.content}</p>
              </CardContent>
              <CardFooter className="justify-end space-x-2">
                <Button variant="outline" size="icon" onClick={() => editNote(note.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => deleteNote(note.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}