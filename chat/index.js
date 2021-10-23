const { SocketAddress } = require('net');
const { type } = require('os');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var user_list = {};

const getUserList = (socket)=>{
  let users_connected = [];
  for (const u in user_list) {
    if(user_list[u]) {
      users_connected.push(u);
    }
  }
  return users_connected;
}

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on("subscribe", (user)=>{
    if(!user_list[user]){
      user_list[user] = true;
      io.emit("chat message",user, "usuario conectado");

      const users = getUserList();
      io.emit("user list", users);
    }
  });

  socket.on("unsubscribe", (user)=>{
    if(user_list[user]){
      user_list[user] = false;
      io.emit("chat message", user, "usuario desconectado");

      const users = getUserList();
      io.emit("user list", users);
    }
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on("get users", ()=>{
    const users = getUserList();
    io.emit("user list", users);
  });

  socket.on('chat message', function(user, msg){
    console.log('message: ' + msg);
    io.emit('chat message', user, msg);
  });

  socket.on("writting", function(user) {
    console.log(user + " writting");
    io.emit("writting", user);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
