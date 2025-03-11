import React from 'react';
import { useSocket } from '../contexts/SocketContext.jsx';

const UserList = () => {
  const { users } = useSocket();

  const getInitials = (id) => id.slice(0, 2).toUpperCase();

  return (
    <div className="p-6 bg-gray-50 border-r w-64">
      <h2 className="text-xl font-semibold mb-4">Online Users</h2>
      {users.map((user) => (
        <div key={user.id} className="flex items-center mb-3">
          <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-2">
            {getInitials(user.id)}
          </div>
          <span>User {user.id.slice(0, 5)}</span>
          <span className="ml-2 text-green-500">●</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;