const users = [];



function addUser({id,username,room}){
    
    let user = users.find(u=>u.username === username && u.room === room);

    if(user)return{error:"user already exists! :()"}
    if(!username || !room)return{error:"Both fields need to be filled out!"};

        user = {id,username,room};

        users.push(user)
        console.log(users);
        return {user}
}


function findUsersInRoom(room){
    return users.filter(u=>u.room === room)
}


function findUser(id){
    return users.filter(u=>u.id === id)
}


function removeUser(id){

    let idx = users.findIndex(u=>u.id === id);

    return users.splice(idx,1);
}


module.exports = { removeUser, findUser, findUsersInRoom, addUser }