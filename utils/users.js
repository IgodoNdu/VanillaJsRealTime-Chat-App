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

//export for use
module.exports = {
    addUser, getCurrentUser
};