const express=require('express');
const app=express();

const PORT=8000;

const students = [
  {id:1,name:"Anushka",branch:"CS"},
  {id:2,name:"Anushka",branch:"CS"},
  {id:3,name:"Anushka",branch:"CS"}
]

app.get("/",(req,res)=>{
  res.send("welcome to home page");
})

app.get("/students",(req,res) => {
  res.json(students)
})

app.get("/students/:id",(req,res)=>{
    res.json(students);
})

app.get("students/search",(req,res) => {
  const searchQuery = req.query;
  console.log(req.query);
})

app.get("/user",(req,res)=>{
    res.json("user page");
})

app.listen(PORT,()=>{
    console.log("Server is listening on port:8000");
})