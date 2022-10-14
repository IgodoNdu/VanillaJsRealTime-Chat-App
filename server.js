const express =  require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
//import the utility function
const formatMessage = require('./utils/messages');
//import user management function
const { addUser, getCurrentUser } = require('./utils/users');

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
    //Get the username and room preference
    socket.on('joinRoom', ({ username, room }) => {
        //console.log(`${socket.id}, with username: ${username} and room preference: ${room}, is a new connection....`)
        //create the user via the userManagemnt function
        const user = addUser(socket.id, username, room);
        //use socket's join method to join the user to it's prefered room
        socket.join(user.room);
        //send welcome message to client
        socket.emit('message', formatMessage(botName, `Welcome to ${user.room} chart room ${user.username}`))
        //notify others when a user joins their room
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} joined the chat`));
    });
    
    //listen for chatMessage from client
    socket.on('chatMessage', (clientmsg) => {
        //console.log(clientmsg);
        //get the current user sending the message via it's socket id
        const user = getCurrentUser(socket.id);
        //emit to everyone in this room
        io.to(user.room).emit('message', formatMessage(user.username, clientmsg));
    })

    //also notify when a client disconnects
    socket.on('disconnect', () => {
        //notify everyone about the user that left
        io.emit('message', formatMessage(botName, 'A user left the chat'));
    });
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));