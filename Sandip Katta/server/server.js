// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');  // <-- Added CORS

// Initialize express and create an HTTP server
const app = express();
const server = http.createServer(app);

// Initialize socket.io with the server
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:3000',  // Allow frontend origin
        methods: ['GET', 'POST'],
    }
});

// Enable CORS for Express
app.use(cors());
// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static('public')); // Optional static files

// Dummy in-memory storage for campus codes and messages
const validCampusCode = "SANDIP123"; // Valid campus code
let messages = [];

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Endpoint to verify campus code and grant access
app.post('/api/verify-campus-code', (req, res) => {
    const { campusCode } = req.body;
    
    if (campusCode === validCampusCode) {
        res.status(200).json({ message: "Code valid, access granted!" });
    } else {
        res.status(400).json({ message: "Invalid campus code" });
    }
});

// Get all messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Post a new message
app.post('/api/messages', (req, res) => {
    const { userId, message } = req.body;
    const newMessage = { userId, message, timestamp: new Date() };
    messages.push(newMessage);
    res.json({ message: "Message sent successfully" });
});

// Example in server-side (Node.js + Express + socket.io)
io.on('connection', (socket) => {
    socket.on('chatMessage', (msg) => {
      io.emit('chatMessage', msg);  // Broadcasts to all clients including sender
    });
  });
  
// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
