import React, { useEffect, useState } from 'react'
import axios from "axios"

function Chat({setShowChat,socket,username,room,setUserName,setRoom}) {
  const[currentMessage,setCurrentMessage]=useState("")
  const[messages,setMessages]=useState([])
  const[olderMessages,setOlderMessages]=useState([])
  
  const handleSendMessage=()=>
  {
    let now= new Date()
     let data={
      currentMessage,
      username,
      room,
      date:now.getHours() + ":" + now.getMinutes()
     }
     socket.emit("send_message",data)
     console.log(data)
     setMessages([...messages,data])
     setCurrentMessage("")
     
  }
  const handleExit=()=>
  {
    setShowChat(false)
    setUserName("")
    setRoom("")
  }
  useEffect(()=>
  {
     socket.on("recieve",(data)=>
     {
      console.log(data)
      console.log(messages)
      setMessages([...messages,data])
     })
  },[socket,messages])
  useEffect(()=>
  {
     axios.get(`https://chat-app-2d57.onrender.com/${room}`).then((res)=>
     {
      console.log(res.data)
      setOlderMessages([...res.data])
     })
  },[room])
  return (
    <div className=''>
      <div className='header'>
         <h2 style={{color:"white"}}>Chat App</h2>
      </div>
      <div className='header2'>
        <h6 style={{color:"white"}}>Room ID: {room}</h6>
      </div>
      <div className='body'>
          <div className='container'>

          {olderMessages && olderMessages.map((message)=>
            { return(
              <div className='messagebox'  style={{width:"400px", backgroundColor:`${message.username.toLowercase()===username.toLowercase()?"#9FBCE8":"#D9D9D9"}`,marginTop:"20px",borderRadius:"20px",paddingLeft:"15px",paddingTop:"5px",marginLeft:`${message.username.toLowercase()===username.toLowercase()?"auto":"0px"}`}}>
              <div className='d-flex'>
             <h5 style={{color:`${message.username.toLowercase()===username.toLowercase()?"#521D1D":"#434182"}`}}>{message.username.toLowercase()===username.toLowercase()?"Me":message.username}</h5>
             <p style={{marginLeft:"auto",marginRight:"20px"}}>{message.date}</p>
             </div>
             <p style={{marginTop:"5px"}}>{message.currentMessage}</p>
           </div>
            )
              
            })}

            {messages && messages.map((message)=>
            { return(
              <div className='messagebox'  style={{width:"400px", backgroundColor:`${message.username.toLowercase()===username.toLowercase()?"#9FBCE8":"#D9D9D9"}`,marginTop:"20px",borderRadius:"20px",paddingLeft:"15px",paddingTop:"5px",marginLeft:`${message.username.toLowercase()===username.toLowercase()?"auto":"0px"}`}}>
              <div className='d-flex'>
             <h5 style={{color:`${message.username.toLowercase()===username.toLowercase()?"#521D1D":"#434182"}`}}>{message.username.toLowercase()===username.toLowercase()?"Me":message.username}</h5>
             <p style={{marginLeft:"auto",marginRight:"20px"}}>{message.date}</p>
             </div>
             <p style={{marginTop:"5px"}}>{message.currentMessage}</p>
           </div>
            )
              
            })}
              
          </div>
      </div>
      <div className='footer'>
         <input value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)} style={{borderRadius:"10px",width:"280px"}}></input><button onClick={handleSendMessage} style={{borderRadius:"10px",marginLeft:"5px"}}><i class="fa-solid fa-paper-plane"></i></button>
         <button style={{borderRadius:"10px",marginLeft:"10px"}} onClick={handleExit}>exit</button>
      </div>
    </div>
  )
}

export default Chat
