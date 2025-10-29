import React from "react";

const NoteCard = ({ note, onEdit, onDelete, onPin, searchQuery }) => {
  // Function to highlight matching search text
  const highlightText = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`note-card ${note.pinned ? "pinned" : ""}`}>
      <div className="note-header">
        <span className="tags">
          {note.tags && note.tags.map((tag, i) => (
            <span key={i} className="tag">#{tag}</span>
          ))}
        </span>
        <button className="pin-btn" onClick={() => onPin(note.id)}>
          {note.pinned ? "📌" : "📍"}
        </button>
      </div>

      <div className="note-content">
        <p>{highlightText(note.text)}</p>
      </div>

      <div className="note-footer">
        <small>{note.summary || "Auto summary unavailable"}</small>
        <small className="mood">{note.mood && `Mood: ${note.mood}`}</small>
      </div>

      <div className="note-actions">
        <button onClick={() => onEdit(note)}>✏️ Edit</button>
        <button onClick={() => onDelete(note.id)}>🗑️ Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
