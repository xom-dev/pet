import React, { useState } from "react";

import NoteCreator from "./components/NoteCreator";
import NotesList from "./components/NotesList";

import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const addNewNote = (newNote) => setNotes([...notes, newNote]);

  const sortByPriority = (isUp) =>
    setNotes([
      ...notes.sort((a, b) => {
        if (isUp) {
          return b.priority - a.priority;
        }
        return a.priority - b.priority;
      })
    ]);

  return (
    <div className='App'>
      <NoteCreator addNewNote={addNewNote} />

      <NotesList list={notes} />

      <div className='priority-wrap'>
        <button onClick={() => sortByPriority(true)} className='sort-up'>
          High
        </button>
        <button onClick={() => sortByPriority()} className='sort-down'>
          Low
        </button>
      </div>
    </div>
  );
}

export default App;
