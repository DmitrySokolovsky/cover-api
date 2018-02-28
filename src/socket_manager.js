const io = require('./index.js').io;
const uuid = require('uuidv4');
const { MESSAGE_SENT, VERIFY_USER, USER_CONNECTED, GET_USER_NAMES, USER_NAMES_RECIEVED } = require('./utils/events');
const { userVerificationCheck, registerUser, getUserNames } = require('./db_utils/varification.db');
const { messageSent, getAllMessageFromUser, getAllMessageNotRead } = require('./db_utils/chatting.db');


let connectedUsers = [];
module.exports = function(socket) {

    socket.on(VERIFY_USER, (name, password) => {
        userVerificationCheck(name, password).then((result) => {
            io.emit(USER_CONNECTED, result);
        });
    });

    socket.on(MESSAGE_SENT, (text, toUser, fromUser, isRead, date) => {
        messageSent(text, toUser, fromUser, isRead, date).then((result) => {
            console.log(result);
        });        
    });

    socket.on(GET_USER_NAMES, () => {
        getUserNames().then((result) => {
            var userNames = result.map((item) => {
                return {
                    name: item.name,
                }
            });
            io.emit(USER_NAMES_RECIEVED, userNames);
        });
    });

}
