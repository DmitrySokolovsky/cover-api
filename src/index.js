var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app);
var socketManager = require('./socket_manager');

const PORT = process.env.PORT || 3231;

io.on('connection', socketManager);

app.listen(PORT, ()=>{
	console.log("listening to port:" + PORT);
});