import React, { useEffect, useState } from "react";
import NoteEditor from "./components/NoteEditor";
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add or update note
  const handleSave = (note) => {
    if (editingNote) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
      setEditingNote(null);
    } else {
      setNotes([note, ...notes]);
    }
  };

  // Delete note
  const handleDelete = (id) => {
    if (window.confirm("Delete this note?")) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  // Edit note
  const handleEdit = (note) => {
    setEditingNote(note);
  };

  // Pin/unpin note
  const handlePin = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  // Filter + search notes
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort notes (pinned notes always on top)
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return sortOrder === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="app">
      <header>
        <h1>🧠 Smart Notes Pro</h1>
        <ThemeToggle />
      </header>

      <div className="toolbar">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <select
          className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>

      <NoteEditor
        onSave={handleSave}
        editingNote={editingNote}
        onCancel={() => setEditingNote(null)}
      />

      <div className="notes-grid">
        {sortedNotes.length > 0 ? (
          sortedNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPin={handlePin}
              searchQuery={searchQuery}
            />
          ))
        ) : (
          <p className="no-notes">No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
