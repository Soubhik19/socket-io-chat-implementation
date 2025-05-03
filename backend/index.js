const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Change this to your frontend's URL in production
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Add this route to prevent 404 on GET /
app.get('/', (req, res) => {
  res.send('Socket.io Chat Server is Running');
});

// Optional: Jenkins can use this for health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

//  server side connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for incoming chat messages
  socket.on("chat", (payload) => {
    console.log("Received message:", payload);
    // Emit message to all connected clients
    io.emit("chat", payload);
  });

  // Optional: Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(5000, () => {
  console.log("Server started on port 5000");
});
