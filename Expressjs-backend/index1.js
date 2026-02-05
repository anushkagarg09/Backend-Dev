const express = require('express');
const fs = require("fs");
const app = express();

app.use(express.json());


const student = [
  { id: 1, name: "Anushka", branch: "CS", email:"anush@gmail.com"},
  { id: 2, name: "Komal", branch: "ECE",email:"bsjbdj@dwkdk"},
  { id: 3, name: "teesha", branch: "IT",email:"gdg2dgu@gmail.com"}
];

app.get("/",(req,res)=>{
  fs.readFile("/student.json",(err,data) =>{
    if(err) {
      return res.status(500).send("Error Occurred");
    }
    return res.status(200).json(JSON.parse(data))
  })
  return res.json(student);
})


app.post("/student/register",(req,res)=>{
    const{name,branch}=req.body;
    if(!name|| !branch) return res.status(400).send("Details missing");
    //send the file first
    fs.readFile("./student.json","utf-8",(err,data)=>{
        if(err) return res.status(500).send("could not read file");

        //parsing existing data or start with empty array
        const student=JSON.parse(data||"[]");

        // create and push new student
        const newStudent={
            id: student.length>0?student[student.length-1].id+1:1,
            name,
            branch
        };
        student.push(newStudent);

        //write the whole array back to the file (overwriting)
        fs.writeFile("./student.json",JSON.stringify(student,null,2), (err)=>{
            if(err) return res.status(500).send("error in writing the file");

            //only send response inside the success callback
            return res
                .status(201)
                .json({message:"Registered!!!", student:newStudent});
        })

    })
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port:3000");
});
