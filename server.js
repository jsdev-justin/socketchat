const express = require('express');


const app = express();
const server = require('http').createServer(app)
const io = require("socket.io")(server)
const PORT = process.env.PORT || 3005;

const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));

app.use(routes)

const { removeUser, findUser, findUsersInRoom, addUser } = require('./users')


io.on('connection',socket=>{
    console.log(socket.id);

    socket.on('join',newuser=>{
        console.log(newuser)
        let {user,error} = addUser({id:socket.id,...newuser})

        if(error){
            console.log("you have an error");
            console.log(error)
            return;
        }
        console.log(user);
if(!user){
    console.log("error")
    return 
}
        socket.join(user.room);
       
        socket.emit("message",{user:"admin",text:`${user.username}, welcome to the chat!`})
        socket.broadcast.to(user.room).emit("message",{user:"admin",text:`Hey everyone, ${user.username} has joined us in the chat!`})
        io.to(user.room).emit("roomData",{room:user.room,roomData:findUsersInRoom(user.room)})
    })

    socket.on('sendMessage',message=>{
        console.log(message);

            user = findUser(socket.id)[0];
            console.log(`User:`,user);
        // socket.emit("message",{text:message,user:user.username})
        io.to(user.room).emit("message",{text:message,user:user.username})
    })

    socket.on("disconnect",()=>{
        console.log("client has disconnected.")
        user = removeUser(socket.id);
        if(user.length){user=user[0]}
        console.log(`User:`,user);
    // socket.emit("message",{text:message,user:user.username})
    io.to(user.room).emit("message",{text:`Aww, looks like ${user.username} has left the chat!`,user:'admin'})
    io.to(user.room).emit('roomData',{room:user.room,roomData:findUsersInRoom(user.room)})
    })
})


server.listen(PORT,console.log(`Logged onto port ${PORT},${process.env.USER}.PID:${process.pid}`))