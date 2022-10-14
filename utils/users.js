//users management
//here users will be in memory (will use a DB in next app)
const users = [];

//add user to chat
function addUser(id, username, room) {
    const user = { id, username, room };
    //add new user to users array
    users.push(user);
    //return the new user for use
    return user;
}

//Get current user
function getCurrentUser(id) {
    return users.find((user) => user.id === id)
}

//User exiting the chat
function userLeaves(id) {
    const index = users.findIndex((user) => user.id === id);
    if(index !== -1) {
        //return the user that's exiting
        return users.splice(index, 1)[0];
    }
}

//get users in a room
function usersInRoom(room){
    //return users with room property = to the room param passed
    return users.filter((user) => user.room === room);
}

//export for use
module.exports = {
    addUser, getCurrentUser, userLeaves, usersInRoom
};