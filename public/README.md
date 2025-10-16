# 🚀 Collaborative Editor

Real-time collaborative document editor built with Node.js, Express, and Socket.IO.

## ✨ Features

- 📝 **Real-time Collaboration** - Multiple users can edit simultaneously
- 👥 **User Presence** - See who's online and active
- 🎨 **Color-coded Users** - Each user gets a unique color
- 💾 **Download & Copy** - Export your documents easily
- 📊 **Live Statistics** - Character, word, and line count
- 🔌 **WebSocket Support** - Ultra-fast real-time updates
- 📱 **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, Socket.IO
- **Frontend:** HTML, CSS, JavaScript
- **Real-time Communication:** WebSocket (Socket.IO)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone or create project directory:**
```bash
mkdir collaborative-editor
cd collaborative-editor
```

2. **Create all files:**
- `package.json`
- `server.js`
- `public/index.html`
- `.gitignore`

3. **Install dependencies:**
```bash
npm install
```

4. **Start the server:**
```bash
npm start
```

5. **Open in browser:**
```
http://localhost:3000
```

## 🚀 Usage

1. Enter your name on the login screen
2. Click "Join Session"
3. Start typing - your changes will sync in real-time!
4. Open multiple browser tabs to test collaboration

## 📁 Project Structure

```
collaborative-editor/
├── server.js           # Backend server with Socket.IO
├── package.json        # Dependencies and scripts
├── .gitignore         # Git ignore rules
├── public/
│   └── index.html     # Frontend HTML/CSS/JS
└── README.md          # Documentation
```

## 🔧 Configuration

### Port Configuration
Change the port in `server.js`:
```javascript
const PORT = process.env.PORT || 3000;
```

### CORS Settings
Modify CORS in `server.js`:
```javascript
cors: {
  origin: "http://your-domain.com",
  methods: ["GET", "POST"]
}
```

## 📡 API Endpoints

- `GET /` - Main application
- `GET /api/status` - Server status and statistics
- `GET /api/users` - List of active users

## 🎯 Socket Events

### Client to Server
- `user-join` - User joins the session
- `content-change` - Document content updated
- `cursor-move` - Cursor position changed

### Server to Client
- `init` - Initial state on connection
- `content-update` - Document updated by another user
- `user-joined` - New user joined
- `user-left` - User disconnected
- `users-update` - Updated user list

## 🐛 Troubleshooting

### Connection Issues
- Check if server is running on correct port
- Verify WebSocket connection in browser console
- Check firewall settings

### Port Already in Use
```bash
# Find process on port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

## 🚀 Deployment

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Render / Railway
- Connect your GitHub repository
- Set build command: `npm install`
- Set start command: `npm start`

## 📝 License

MIT License - feel free to use this project!

## 👨‍💻 Author

Built with ❤️ using Node.js and Socket.IO

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

**Happy Collaborative Editing! 🎉**