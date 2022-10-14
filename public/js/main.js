//Accesst to the chat form
const chatForm = document.getElementById('chat-form');
const socket = io();

//receiving message from server
socket.on('message', (message) => {
    console.log(message);
    //for rendering the message from server
    outputMessaage(message);
});

//handling submission from the chatForm
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user input (the one with id of msg)
    const clientmsg = e.target.elements.msg.value;
    //console.log(clientmsg)
    //Emit clientmsg to the server
    socket.emit('chatMessage',clientmsg)
});

//rendering received msg to DOM
function outputMessaage(message) {
    //make a div
    const div = document.createElement('div');
    //add a class('message') to the created div
    div.classList.add('message');
    //set it's innerHTML
    div.innerHTML = `<p class="meta">Emeka <span>9:12pm</span></p>
    <p class="text">
        ${message}.
    </p>`;
    //now put it into the DOM
    document.querySelector('.chat-messages').appendChild(div);

}