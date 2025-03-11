import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('noteUpdate', (updatedNotes) => setNotes(updatedNotes));
    newSocket.on('userList', (userList) => setUsers(userList));
    newSocket.on('notification', (msg) => setNotifications(prev => [...prev, msg].slice(-5))); // Limit to 5
    newSocket.on('userTyping', (userId) => setTypingUsers(prev => [...new Set([...prev, userId])])); // Add unique
    newSocket.on('userStoppedTyping', (userId) => setTypingUsers(prev => prev.filter(id => id !== userId)));

    return () => newSocket.disconnect();
  }, []);

  const joinRoom = (code) => {
    if (socket) {
      socket.emit('joinRoom', code);
      setRoomCode(code);
    }
  };

  const leaveRoom = () => {
    setRoomCode(null);
    setNotes([]);
    setUsers([]);
    setNotifications([]);
    setTypingUsers([]);
  };

  return (
    <SocketContext.Provider value={{ socket, roomCode, notes, users, notifications, typingUsers, joinRoom, leaveRoom, setNotes }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);