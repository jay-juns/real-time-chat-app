import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ?
       (
        <div>
            <h3>채팅방 입장</h3>
            <input 
              type="text" 
              placeholder='닉네임을 입력해주세요.' 
              onChange={(e) => 
                {setUsername(e.target.value)
              }} 
            />
            
            <input 
              type="text" 
              placeholder='방 이름을 이렵해주세요.' 
              onChange={(e) => 
                {setRoom(e.target.value)
              }} 
            />
            <button onClick={joinRoom}>채팅방 입장하기</button>
          </div>
        )
        :
        (
          <Chat socket={socket} username={username} room={room} /> 
        )}
    </div>
  );
}

export default App;
