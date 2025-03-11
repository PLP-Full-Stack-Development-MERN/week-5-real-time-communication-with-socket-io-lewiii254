const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/real-time-notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'));

// Note Schema
const NoteSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
  roomCode: String,
});
const Note = mongoose.model('Note', NoteSchema);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// RESTful Endpoints
app.get('/notes/:roomCode', async (req, res) => {
  const { roomCode } = req.params;
  const notes = await Note.find({ roomCode });
  res.json(notes);
});

app.post('/notes/:roomCode', async (req, res) => {
  const { roomCode } = req.params;
  const note = new Note({ ...req.body, roomCode });
  await note.save();
  const updatedNotes = await Note.find({ roomCode });
  io.to(roomCode).emit('noteUpdate', updatedNotes);
  res.status(201).json(note);
});

// Socket.io Events
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (roomCode) => {
    socket.join(roomCode);
    socket.to(roomCode).emit('notification', `${socket.id.slice(0, 5)} joined the room`);
    io.to(roomCode).emit('userList', Array.from(io.sockets.adapter.rooms.get(roomCode) || []).map(id => ({ id })));
  });

  socket.on('noteEdit', async ({ roomCode, note }) => {
    await Note.findOneAndUpdate(
      { id: note.id, roomCode },
      note,
      { upsert: true, new: true } // Creates if not exists
    );
    const updatedNotes = await Note.find({ roomCode });
    io.to(roomCode).emit('noteUpdate', updatedNotes);
  });

  socket.on('typing', ({ roomCode, userId }) => {
    socket.to(roomCode).emit('userTyping', userId);
  });

  socket.on('stopTyping', ({ roomCode, userId }) => {
    socket.to(roomCode).emit('userStoppedTyping', userId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    io.emit('notification', `${socket.id.slice(0, 5)} left the room`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));