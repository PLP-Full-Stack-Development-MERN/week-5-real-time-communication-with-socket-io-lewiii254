import React from 'react';
import { useSocket } from '../contexts/SocketContext.jsx';

const NotificationFeed = () => {
  const { notifications } = useSocket();

  return (
    <div className="p-6 bg-gray-50 border-l w-64">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      {notifications.map((msg, index) => (
        <div key={index} className="mb-2 text-gray-600 animate-slide-in">
          {msg}
        </div>
      ))}
    </div>
  );
};

export default NotificationFeed;