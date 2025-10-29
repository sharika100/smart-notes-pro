export default function NoteCard({ note, deleteNote, togglePin }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <small>{note.date}</small>
      <div>
        <button onClick={() => togglePin(note.id)}>
          {note.pinned ? '📌 Unpin' : '📌 Pin'}
        </button>
        <button onClick={() => deleteNote(note.id)}>🗑️ Delete</button>
      </div>
    </div>
  );
}
