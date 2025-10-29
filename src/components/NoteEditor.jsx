import React, { useState, useEffect } from "react";

const NoteEditor = ({ onSave, editingNote, onCancel }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editingNote) {
      setText(editingNote.text);
    } else {
      setText("");
    }
  }, [editingNote]);

  // Mock AI summary and tags
  const generateAIData = (text) => {
    const words = text.split(" ").filter((w) => w.length > 3);
    return {
      summary: words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : ""),
      tags: words.slice(0, 3).map((w) => w.toLowerCase()),
      mood: ["Happy", "Calm", "Focused", "Creative"][Math.floor(Math.random() * 4)],
    };
  };

  const handleSave = () => {
    if (!text.trim()) return alert("Note cannot be empty!");

    const aiData = generateAIData(text);
    const newNote = {
      id: editingNote ? editingNote.id : Date.now(),
      text,
      ...aiData,
      pinned: editingNote ? editingNote.pinned : false,
      date: new Date().toISOString(),
    };
    onSave(newNote);
    setText("");
  };

  return (
    <div className="note-editor">
      <textarea
        placeholder="Write your note here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
      />
      <div className="editor-buttons">
        <button onClick={handleSave}>{editingNote ? "💾 Update" : "➕ Add Note"}</button>
        {editingNote && (
          <button className="cancel-btn" onClick={onCancel}>❌ Cancel</button>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
