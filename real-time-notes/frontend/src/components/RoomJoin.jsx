import React, { useState } from 'react';
import { useSocket } from '../contexts/SocketContext.jsx';

const RoomJoin = () => {
  const [code, setCode] = useState('');
  const { joinRoom } = useSocket();

  const handleJoin = () => {
    if (code) joinRoom(code);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Real-Time Notes</h1>
      <div className="flex space-x-4">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Room Code"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={handleJoin} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          Join Room
        </button>
        <button
          onClick={() => joinRoom(Date.now().toString())}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Create New Room
        </button>
      </div>
    </div>
  );
};

export default RoomJoin;