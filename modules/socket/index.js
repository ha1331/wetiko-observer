const socket = require("./socket");

socket.on("connect", function(){
  console.log("connected");
});

socket.on("event", function(data){
  console.log("event:" + data);
});

socket.on("disconnect", function(){
  console.log("disconnected");
});