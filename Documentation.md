# Real-Time Collaborative Notes
A full-stack MERN (MongoDB, Express.js, React, Node.js) application with Socket.io for real-time collaboration on notes. Users can join rooms, create/edit notes, see who’s online, and get live updates—all with a modern, responsive UI.

## Overview
This project demonstrates real-time communication using WebSockets via Socket.io. It allows multiple users to collaborate on shared notes within specific rooms, with features like live typing indicators, user presence, and a sleek design powered by Tailwind CSS.

Backend: Express.js with Socket.io for WebSocket communication.

Frontend: React with Vite for fast development and Tailwind CSS for styling.

Storage: In-memory (default) or MongoDB (optional) for note persistence.

## Features
Room-Based Collaboration: Join or create rooms using unique codes.

Real-Time Updates: Notes sync instantly across all users in a room.

Note Editing: Create new notes or edit existing ones with live updates.

Typing Indicators: See when other users are typing.

User Presence: Display a list of online users with avatars.

Notifications: Real-time alerts for join/leave events.

Responsive UI: Clean, modern design with dark mode toggle.

## Prerequisites
Node.js (v16+ recommended)

npm (v8+)

MongoDB (optional, for persistent storage)

## Installation
1. Clone the Repository
    ```
     git clone <your-repo-url>
     cd real-time-notes

    ```

2. Backend Setup
Navigate to the backend folder:
```
cd backend
Install dependencies:
npm install
```
Create a .env file in backend/:
```
PORT=5000
FRONTEND_URL=http://localhost:5173
```
# Optional: Add for MongoDB
# MONGO_URI=mongodb://localhost:27017/real-time-notes
Start the backend:
```
node server.js
```

3. Frontend Setup

Navigate to the frontend folder:
```
cd ../frontend
Install dependencies:
npm install
```
Create a .env file in frontend/:
```
VITE_API_URL=http://localhost:5000
```
Start the frontend:
```
npm run dev
```
4. Test Locally

Open http://localhost:5173 in your browser.

Join or create a room, add/edit notes, and test real-time features with multiple tabs.

## Key Real-Time Concepts
- WebSockets: Socket.io enables bi-directional communication between the client and server, powering live - updates for notes, user presence, and notifications.
- Rooms: Socket.io’s room feature isolates collaboration to specific groups, ensuring updates only reach relevant users.
- Events: Custom events (noteEdit, typing, joinRoom) handle real-time interactions efficiently.
### Deployment
Backend (e.g., Render)

Push the backend folder to a GitHub repository.

Deploy on Render:

Set environment variables in the Render dashboard:
```
PORT=5000
FRONTEND_URL=<your-vercel-url>
```
# Optional: MONGO_URI=<your-mongo-uri>
Command: node server.js

Note the deployed URL (e.g., https://your-backend.onrender.com).

Frontend (e.g., Vercel)

Push the frontend folder to a GitHub repository.

Deploy on Vercel:

Set environment variables in Vercel:
```
VITE_API_URL=<your-backend-url>
Access the deployed app at the Vercel URL (e.g., https://your-frontend.vercel.app).
```