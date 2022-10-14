//Accesst to the chat form
const chatForm = document.getElementById('chat-form');
//get the chat messages div, will use this for auto-scroll to the recent msg
chatMessages = document.querySelector('.chat-messages');
//set the divs for room name and users in the room
const roomName = document.getElementById('room-name');
const roomUsers = document.getElementById('users');
//Get details (usernam and room) from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
//console.log(username, room);
const socket = io();

//join room custom event
socket.emit('joinRoom', { username, room });

//Get room and its users
socket.on('roomUsers', ({ room, users }) => {
    //helper functions for rendering room and it's users
    outPutRoomName(room);
    outPutRoomUsers(users);
});

//receiving message from server
socket.on('message', (message) => {
    console.log(message);
    //for rendering the message from server
    outputMessaage(message);
    //Auto scroll down to recent message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//handling submission from the chatForm
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user input (the one with id of msg)
    const clientmsg = e.target.elements.msg.value;
    //console.log(clientmsg)
    //Emit clientmsg to the server
    socket.emit('chatMessage',clientmsg)
    //clear the text-field and focus on it
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

//rendering received msg to DOM
function outputMessaage(message) {
    //make a div
    const div = document.createElement('div');
    //add a class('message') to the created div
    div.classList.add('message');
    //set it's innerHTML
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.msg}.
    </p>`;
    //now put it into the DOM
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outPutRoomName(room) {
    roomName.innerText = room;
}

// Add list of users in room to DOM
function outPutRoomUsers(users) {
    roomUsers.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}