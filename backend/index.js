const { Socket } = require('dgram');
const express =require('express')
const app =express();

const server =require('http').createServer(app);
const io =require('socket.io')(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});

// Add this route to prevent 404 on GET /
app.get('/', (req, res) => {
    res.send('Socket.io Chat Server is Running');
});

//  Optional: Jenkins can use this for health check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

//  server side connection 
io.on("connection", (socket) => {
    console.log(`someone is connected on ${socket.id}`);
    console.log("socket is active to connected");

    socket.on("chat", (payload) => {
        console.log("what is payload", payload);
        io.emit("chat", payload);
    });
});

server.listen(5000,()=>{
    console.log("server started at 5000");
    
})