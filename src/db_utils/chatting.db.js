var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var messageShcheme = new Schema({
    text: String,
    toUserName: String,
    fromUserName: String,
    isRead: Boolean,
    date: Date
});

function messageSent(text, toUserName, fromUserName, isRead, date) {
    return new Promise(function(resolve, reject) {
        mongoose.connect('mongodb://localhost:27017/userdb');

        var Message = mongoose.model('Message', messageShcheme);

        Message.create({text, toUserName, fromUserName, isRead, date}, function(err, docs) {
            mongoose.disconnect();

            if(docs) {
                resolve(docs);
            }

            if(err) {
                reject(err);
            }        
        });
    });
}

function getAllMessageFromUser(fromUserName) {
    return new Promise(function(resolve, reject) {
        mongoose.connect('mongodb://localhost:27017/userdb');

        var Message = mongoose.model('Message', messageShcheme);

        Message.find({fromUserName}, function(err, docs) {
            mongoose.disconnect();
            if(docs) {
                resolve(docs);
            }
            else {
                reject(err);
            }        
        });
    });
}

function getAllMessageNotRead(fromUserName) {
    return new Promise(function(resolve, reject) {
        mongoose.connect('mongodb://localhost:27017/userdb');

        var Message = mongoose.model('Message', messageShcheme);
        var isRead = false
        Message.find({fromUserName, isRead}, function(err, docs) {
            mongoose.disconnect();
            if(docs) {
                resolve(docs);
            }
            else {
                reject(err);
            }        
        });
    });
}

module.exports = {
    messageSent: messageSent,
    getAllMessageFromUser: getAllMessageFromUser,
    getAllMessageNotRead: getAllMessageNotRead
};