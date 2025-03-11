import React, { useState, useEffect } from 'react';
import { useSocket } from '../contexts/SocketContext.jsx';

const NoteEditor = () => {
  const { socket, roomCode, notes, typingUsers } = useSocket();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSave = () => {
    const note = editingNote ? { ...editingNote, title, content } : { id: Date.now(), title, content };
    socket.emit('noteEdit', { roomCode, note });
    setTitle('');
    setContent('');
    setEditingNote(null);
  };

  const handleTyping = () => {
    socket.emit('typing', { roomCode, userId: socket.id });
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => socket.emit('stopTyping', { roomCode, userId: socket.id }), 1000);
  };

  return (
    <div className="p-6 flex-1 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Notes</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <textarea
        value={content}
        onChange={(e) => { setContent(e.target.value); handleTyping(); }}
        placeholder="Note Content"
        className="w-full p-2 h-40 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button onClick={handleSave} className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
        {editingNote ? 'Update Note' : 'Save Note'}
      </button>
      {typingUsers.length > 0 && (
        <p className="mt-2 text-sm text-gray-500">
          {typingUsers.map(id => `User ${id.slice(0, 5)}`).join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
        </p>
      )}
      <div className="mt-4 space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 bg-gray-50 rounded-lg shadow animate-fade-in">
            <h3 className="font-medium">{note.title}</h3>
            <p className="text-gray-700">{note.content}</p>
            <button
              onClick={() => setEditingNote(note)}
              className="mt-2 text-sm text-indigo-600 hover:underline"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteEditor;