import React, { useState, useEffect } from 'react';
import NoteCard from './components/NoteCard';
import NoteEditor from './components/NoteEditor';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import { saveNotes, loadNotes } from './utils/storage';
import { generateSmartTags } from './utils/smartFeatures';
import './App.css'; // import CSS here as well

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  // Save notes to localStorage on every change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Add new note
  const addNote = (title, content) => {
    if (!title && !content) return;

    const { summary, tags, mood } = generateSmartTags(content);

    const newNote = {
      id: Date.now(),
      title,
      content,
      summary,
      tags,
      mood,
      pinned: false,
      date: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);
  };

  // Delete note
  const deleteNote = (id) => setNotes(notes.filter((n) => n.id !== id));

  // Toggle pin
  const togglePin = (id) =>
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));

  // Filter and sort notes
  const filteredNotes = notes
    .filter(
      (n) =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? -1 : 1));

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <h1>🧠 Smart Notes Pro</h1>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <SearchBar setSearchTerm={setSearchTerm} />
      <NoteEditor addNote={addNote} />
      <div className="note-list">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            togglePin={togglePin}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
