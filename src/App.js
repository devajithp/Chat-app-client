
import { useState } from 'react';
import './App.css';
import Chat from './Chat';
import io from "socket.io-client"
const socket= io.connect("https://chat-app-2d57.onrender.com")
function App() {
  const[showChat,setShowChat]=useState(false)
  const[username,setUserName]=useState("")
  const[room,setRoom]=useState("")
  
  const handleJoin=()=>
  {
    if(username.trim()!=="" && room.trim()!=="")
    {
      let data={
        username,
        room
      }
      socket.emit("join_room",data)
      setShowChat(true)
      
    }
  }
  return (
    <div className="App">
      
     {!showChat && <div style={{borderRadius:"20px"}} className='room'>
          <h1 style={{color:"white",marginTop:"20px",fontFamily: 'Comic Neue'}}>Let's Chat</h1>
          <input value={username} onChange={(e)=>setUserName(e.target.value)} placeholder='username..' style={{marginTop:"30px",borderRadius:"10px",borderWidth:"0.01px"}}></input><br></br>
          <input value={room} onChange={(e)=>setRoom(e.target.value)} placeholder='roomID..' style={{marginTop:"25px",borderRadius:"10px",borderWidth:"0.01px"}}></input><br></br>
          <button onClick={handleJoin} className='btn btn-success' style={{marginTop:"15px"}}>Join</button>
      </div>}
      {showChat && <Chat setUserName={setUserName} setRoom={setRoom}  username={username} room={room} socket={socket} setShowChat={setShowChat}></Chat>}
    </div>
  );
}

export default App;
