// [...netlify].js

const { Server } = require('socket.io');

const express = require('express');

exports.handler = (event, context) => {
  const app = express();

  const server = require('http').createServer(app);

  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming events and send data back to clients

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg); // Broadcast to all connected clients
    });
  });

  return new Promise((resolve) => {
    server.listen(process.env.PORT || 5000, () => {
      resolve('Server started');
    });
  });
};
