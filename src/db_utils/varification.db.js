var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var userShcheme = new Schema({
    name: String,
    password: String
});

function userVerificationCheck(name, password) {
    return new Promise(function(resolve, reject) {
        mongoose.connect('mongodb://localhost:27017/userdb');

        var User = mongoose.model('User', userShcheme);

        User.findOne({name, password}, function(err, docs) {
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

function registerUser() {
    return new Promise(function(resolve, reject) {
        mongoose.connect('mongodb://localhost:27017/userdb');

        var User = mongoose.model("User", userShcheme);

        User.create({name: 'harry', password: '123'}, function(err, docs) {
            mongoose.disconnect();
            if (err) { reject(err); }

            if(docs) { resolve(docs); }
        });
    });
}

function getUserNames() {
    return new Promise(function(resolve, reject) {
        mongoose.connect('mongodb://localhost:27017/userdb');

        var User = mongoose.model('User', userShcheme);
        User.find({}, function(err, docs) {
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
    userVerificationCheck: userVerificationCheck,
    registerUser: registerUser,
    getUserNames: getUserNames
}