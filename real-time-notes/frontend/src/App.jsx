import React, { useState } from 'react';
import { SocketProvider } from './contexts/SocketContext.jsx';
import RoomJoin from './components/RoomJoin.jsx';
import NoteEditor from './components/NoteEditor.jsx';
import UserList from './components/UserList.jsx';
import NotificationFeed from './components/NotificationFeed.jsx';
import { useSocket } from './contexts/SocketContext.jsx';

const AppContent = () => {
  const { roomCode, leaveRoom } = useSocket();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {!roomCode ? (
        <RoomJoin />
      ) : (
        <>
          <UserList />
          <NoteEditor />
          <NotificationFeed />
          <button
            onClick={leaveRoom}
            className="absolute top-4 right-20 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Leave Room
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-4 right-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <SocketProvider>
      <AppContent />
    </SocketProvider>
  );
}

export default App;