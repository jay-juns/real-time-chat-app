const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io")
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origiin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`연결된 유저 ${socket.id}`);

  socket.on("join_room", (data) =>{
    socket.join(data);
    console.log(`유저 소켓 아이디: ${socket.id} 접속한 룸: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("연결 끊김", socket.id);
  });
});

server.listen(3001, () => {
  console.log(`서버 구동중`);
});