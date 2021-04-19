// const socket = io();

const loginBtn = document.querySelector(".login");


loginBtn.onclick=login;

onkeydown=(e)=>{
    if(e.key === "Enter"){
        login()
    }
}

function login(){

    let user={
        username:document.querySelector("input[name='username']").value,
        room:document.querySelector("input[name='room']").value,
    }

    // socket.emit("join",user)
    setTimeout(()=>{
        console.log("migrating user");
        window.location=`/chat?room=${user.room}&name=${user.username}`
    })

    // fetch('/login',{
    //     method:"POST",
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify(user)
    // })
    // .then(res=>res.json())
    // .then(res=>{
    //     console.log(res);
    // })
}