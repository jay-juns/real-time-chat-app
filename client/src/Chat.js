import React, { useEffect, useState } from 'react'

function Chat({ socket, username, room }) {
  const [currentMeesage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (currentMeesage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMeesage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(), 
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket])

  return (
    <div>
      <div>
        <div className='chat-header'>
          <p>{room} 방</p>
        </div>
        <div className='chat-body'>
          {messageList.map((messageContent, index) => {
            return <h1 className={username === messageContent.author ? "my-message message" : "message"} key={index}>{messageContent.message}</h1>  
          })}
        </div>
        <div className='chat-footer'>
          <form onSubmit={sendMessage}>
            <input 
              type="text" 
              placeholder='메세지를 작성해주세요.'
              value={currentMeesage}
              onChange={e=> setCurrentMessage(e.target.value)} 
            />
            <button>메세지 보내기</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat;