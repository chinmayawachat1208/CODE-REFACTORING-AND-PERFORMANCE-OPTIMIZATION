const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage
let documentContent = '';
let activeUsers = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('✅ New user connected:', socket.id);

  // User joins the session
  socket.on('user-join', (username) => {
    const user = {
      id: socket.id,
      name: username || 'Anonymous',
      color: getRandomColor(),
      active: true,
      joinedAt: new Date().toISOString()
    };
    
    activeUsers.set(socket.id, user);
    
    // Send current document state to the new user
    socket.emit('init', {
      content: documentContent,
      users: Array.from(activeUsers.values())
    });
    
    // Notify all other users about new user
    socket.broadcast.emit('user-joined', user);
    
    // Send updated user list to everyone
    io.emit('users-update', Array.from(activeUsers.values()));
    
    console.log(`👤 User "${username}" joined (Total users: ${activeUsers.size})`);
  });

  // Handle content changes
  socket.on('content-change', (data) => {
    documentContent = data.content;
    
    // Broadcast to all other users
    socket.broadcast.emit('content-update', {
      content: data.content,
      userId: socket.id,
      timestamp: Date.now()
    });
  });

  // Handle cursor position updates
  socket.on('cursor-move', (data) => {
    socket.broadcast.emit('cursor-update', {
      userId: socket.id,
      position: data.position,
      username: activeUsers.get(socket.id)?.name
    });
  });

  // Handle user typing indicator
  socket.on('typing', (isTyping) => {
    socket.broadcast.emit('user-typing', {
      userId: socket.id,
      username: activeUsers.get(socket.id)?.name,
      isTyping
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    
    if (user) {
      activeUsers.delete(socket.id);
      
      // Notify all users about disconnection
      io.emit('user-left', {
        userId: socket.id,
        username: user.name
      });
      
      // Send updated user list
      io.emit('users-update', Array.from(activeUsers.values()));
      
      console.log(`❌ User "${user.name}" disconnected (Total users: ${activeUsers.size})`);
    }
  });

  // Handle errors
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Helper function to generate random color
function getRandomColor() {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B500', '#FF69B4', '#32CD32', '#FF4500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// API Routes
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    activeUsers: activeUsers.size,
    documentLength: documentContent.length,
    uptime: process.uptime()
  });
});

app.get('/api/users', (req, res) => {
  res.json({
    users: Array.from(activeUsers.values())
  });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket server is ready`);
  console.log(`👥 Waiting for users to connect...`);
});