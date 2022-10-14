const express =  require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
//import the utility function
const formatMessage = require('./utils/messages');

const app = express();
//creating a server instance
const server = http.createServer(app);
//initialize socketio with the server
const io = socketio(server);

//set static folder (public folder)
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Raptor'

//When a client connects
io.on('connection', (socket) => {
    console.log(`${socket.id} is a new connection....`)
    //send welcome message to client
    socket.emit('message', formatMessage(botName, 'Welcome to chart room'))
    //notify others when a user joins their room
    socket.broadcast.emit('message', formatMessage(botName, 'A user joined the chat'));
    //also notify when a client disconnects
    socket.on('disconnect', () => {
        //notify everyone about the user that left
        io.emit('message', formatMessage(botName, 'A user left the chat'));
    });
    //listen for chatMessage from client
    socket.on('chatMessage', (clientmsg) => {
        //console.log(clientmsg);
        //emit to everyone
        io.emit('message', clientmsg);
    })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));