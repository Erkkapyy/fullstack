import React, { useState } from "react"
import Note from "./components/Note"

const App = props => {
  const [notes, setNotes] = useState(props.notes)

  const rows = () => notesToShow.map(note => <Note key={note.id} note={note} />)
  const [newNote, setNewNote] = useState("Uusi muistiinpano")
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const handleNoteChange = event => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString,
      important: Math.random() > 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject))
    setNewNote("")
  }

  return (
    <div>
      <h1>Muistiinpanot</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          näytä {showAll ? "vain tärkeät" : "kaikki"}
        </button>
      </div>
      <ul>{rows()}</ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default App
