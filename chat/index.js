const { SocketAddress } = require('net');
const { type } = require('os');

const express= require('express');
const { connected } = require('process');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

class User {
  constructor (id, nombre, conectado) {
    this.id = id;
    this.nombre = nombre;
    this.conectado = conectado;
  }
  get sock(){return this.id}
  set sock(x) {this.id = x}

  get estado(){return this.conectado}
  set estado(s){this.conectado=s}
}

app.use(express.static(__dirname+"/public"));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var total_user_list = {};

const getUserList = (socket)=>{
  let users_connected = [];
  for (const u in total_user_list) {
    if(total_user_list[u].conectado) {
      users_connected.push(u);
    }
  }
  return users_connected;
}

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on("subscribe", (user)=>{
    total_user_list[user] = new User(socket, user, true);
    io.emit("user connected",user);

    const users = getUserList();
    console.log(users);
    io.emit("user list", users);
  });

  socket.on("unsubscribe", (user)=>{
    if(total_user_list[user])
      {
    total_user_list[user].conectado = false;
    console.log('user disconnected '+user);
    io.emit("user disconnected",user);

    const users = getUserList();
    io.emit("user list", users);

      }
  });

  socket.on('chat message', function(src, dst, msg){
    console.log('message: ' + msg);

    if (dst && total_user_list[dst]) {
      console.log("enviando mensaje a " + dst);
      var dstChannel = total_user_list[dst].id;
      dstChannel.emit("chat message", src, msg);
    } else {
      io.emit('chat message', src, msg);
    }

  });

  socket.on("writting", function(user) {
    console.log(user + " writting");
    io.emit("writting", user);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
