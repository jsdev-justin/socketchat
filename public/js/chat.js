let roomDOM = document.querySelector(".room")
let messagesDOM = document.querySelector(".messages-card")
let peopleListDOM = document.querySelector("#peopleList")
let peopleCountDOM = document.querySelector("#peopleCount")
let messagesInput = document.querySelector("input[name='message']")
let commentIcon = document.querySelector("#comment-icon")

var socket = io()

let room = new URLSearchParams(location.search).get("room")
let username = new URLSearchParams(location.search).get("name")


//ui-clean/error-check

if(!room){
    window.location = "/login"
}

history.pushState(null,{},"/chat")
roomDOM.innerText = room[0].toUpperCase() + room.split("").splice(1,room.length-1).join("")




//socket behavior

socket.emit("join",{username,room})


socket.on("message",message=>{
    console.log(message)
    let messageDiv = document.createElement("div");
        messageDiv.className="message-div";
    if(message.user === username){
        messageDiv.classList.add('flex-end')
    }

    let h4Message = document.createElement("h4");
        h4Message.className="h4-message"
        h4Message.innerText = message.text;
    let h5User = document.createElement("h4");
        h5User.className="h4-user"
        h5User.innerText = message.user;;

    messageDiv.appendChild(h4Message);
    messageDiv.appendChild(h5User);
    messagesDOM.appendChild(messageDiv)
})


socket.on('roomData',data=>{
    console.log(data)
    peopleCountDOM.innerText = data.roomData.length;
    let html = ""
    data.roomData.map(person=>(
        html += `<li>${person.username}</li>`
    ))

    peopleListDOM.innerHTML = html;
})



//send message via keypad/Enter

onkeydown=(e)=>{
    if(e.key === "Enter"){
        if(!messagesInput.value){
            console.log("no message, exit outta function");
            return;
        }
        console.log('emit sendMessage!')
        console.log(socket)
        socket.emit('sendMessage',messagesInput.value)

        messagesInput.value = ""
    }
}





// send message via icon-btn

commentIcon.onclick=()=>{
    if(!messagesInput.value){
        console.log("no message, exit outta function");
        return;
    }
    console.log('emit sendMessage!')
    console.log(socket)
    socket.emit('sendMessage',messagesInput.value)

    messagesInput.value = ""

}