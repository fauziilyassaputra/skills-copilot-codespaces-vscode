// Create web server
const express = require('express');
const app = express();

// Create server
const server = require('http').createServer(app);

// Create socket
const io = require('socket.io')(server);

// Create comments array
let comments = [];

// Create socket connection
io.on('connection', (socket) => {
    console.log('Socket connected: ' + socket.id);

    // Send comments to client
    socket.emit('comments', comments);

    // Add comment
    socket.on('add-comment', (comment) => {
        comments.push(comment);
        io.emit('comments', comments);
    });

    // Remove comment
    socket.on('remove-comment', (index) => {
        comments.splice(index, 1);
        io.emit('comments', comments);
    });
});

// Start server
server.listen(3000, () => {
    console.log('Server started');
});