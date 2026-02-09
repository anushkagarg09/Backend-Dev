// DAY1- LEARNING BASIC ROUTING


const express=require('express')
const app=express()
const PORT=8000;
const student=[
 {id: 1, name:"annu the don", branch:"billu mafia da leader"},
 {id: 2, name:"annu da dhaba", branch:"billu mafia da karamchaari"},
 {id: 3, name:"annu di gaddi", branch:"billu mafia da billu badmosh"}]

app.get("/",(req,res)=>{
    res.send("welcome to home page");
})

app.get("/student",(req,res)=>{
    res.json(student);
}
)

app.get("/student/:id",(req,res)=>{
    res.send("");
}
)

app.get("student/search",(req,res)=>{
    const searchQuery=req.query;
    console.log(req.query);

})

app.listen(PORT,()=>{
    console.log("Server is listening on port: 8000");
})