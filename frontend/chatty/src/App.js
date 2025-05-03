import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';

import './App.css';

// Initialize socket connection
const socket = io.connect("http://localhost:5000");

// Generate userName once during initialization
const userName = nanoid(4);

function App() {
  // State for message input and chat history
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Send chat message to backend
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage(""); // Clear the message input after sending
  };

  // Listen for incoming chat messages
  useEffect(() => {
    socket.off("chat"); // Clear old listener before adding a new one

    socket.on("chat", (payload) => {
      setChat((prevChat) => [...prevChat, payload]); // Add new message to chat history
    });

    return () => {
      socket.off("chat"); // Cleanup listener on unmount
    };
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty App</h1>

        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="Send message"
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Update message state on input change
          />
          <button type="submit">Send</button>
        </form>

        {chat.map((payload, index) => (
          <p key={index}>
            {payload.message}: <span>id:{payload.userName}</span>
          </p>
        ))}
      </header>
    </div>
  );
}

export default App;
