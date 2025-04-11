import logo from './logo.svg';
import {useState,useEffect, use, useSyncExternalStore} from 'react'
import {io} from 'socket.io-client'
import {nanoid} from 'nanoid'

import './App.css';

const socket = io.connect("http://localhost:5000");
const userName =nanoid(4);
function App() {
//we need state a messege of a messege itself
const [messege,setMessege]=useState("")   //this is the state where we sending the messege to the socket 
const [chat, setChat]=useState([])

//send messege fuction
const sendChat =(e)=>{
e.preventDefault()
socket.emit("chat",{messege,userName});
setMessege("");
}
//Receive Message with useEffect
useEffect(() => {
  socket.off("chat"); // Clear old listener before adding a new one
  socket.on("chat", (payload) => {
    setChat([...chat, payload]);
  });
}, [chat]);



 return (
    <div className="App">
        <header className="App-header">
         <h1>Chatty App</h1>

          
         <form onSubmit={sendChat}>                  
          <input type="text" name='chat' 
          placeholder='send messege'
          value={messege}
          onChange={(e)=>{
          setMessege(e.target.value)
  }}
  />
  <button type='submit'>Send</button>
</form>
{chat.map((payload,index)=>{          //Display Messages
            return <p key={index}>{payload.messege}:<span>id:{payload.userName}</span></p>
          })}


      </header>
    </div>
  );
}

export default App;
