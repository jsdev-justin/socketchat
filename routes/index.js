const router = require("express").Router();
const path = require("path")


router.get("/",(req,res)=>{
    res.redirect("/login")
})


router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname, "../public/login.html"))
})

router.get('/chat',(req,res)=>{
    res.sendFile(path.join(__dirname, "../public/room.html"))
})


// router.post("/login",(req,res)=>{
//     console.log(req.body);
// })


module.exports = router;