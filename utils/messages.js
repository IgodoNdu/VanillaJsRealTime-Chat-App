const moment = require('moment');

//format messages
function formatMessage(username, msg) {
    return {
        username,
        msg,
        //get time stamp
        time: moment().format('h:mm a'),
    }
}

//export for use
module.exports = formatMessage;