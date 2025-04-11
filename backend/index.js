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