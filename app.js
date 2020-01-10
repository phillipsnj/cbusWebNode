var net = require('net');
var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var client = new net.Socket();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

client.connect(5550, '192.168.8.200', function () {
    console.log('Client Connected');
});

client.on('data', function (data) {
    console.log('Received: ' + data);
    io.emit('data', data.toString());
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('data', function(msg){
        console.log(msg.toString());
        client.write(msg.toString());
    });
});



http.listen(3001, function(){
    console.log('listening on *:3001');
});