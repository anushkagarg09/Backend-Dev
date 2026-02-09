const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 8000;

app.use(express.json());
const students = [
  { id: 1, name: "raj", branch: "CSE" },
  { id: 2, name: "Ajay", branch: "ECE" },
  { id: 3, name: "Yash", branch: "IT" },
];

app.get("/students",async (req,res)=>{
  console.log(";;;;")
  fs.readFile("./student.json","utf-8",(err,data) =>{
    if(err) {
      return res.status(500).send("Error Occurred");
    }
    const b = JSON.parse(data || "[]");
    console.log(b);
    return res.status(200).send(b);
  });
})



// app.post("/students/register", (req, res) => {
//   const { name, branch } = req.body;
//   if (!name || !branch) return res.status(400).send("Details missing");

//   //  Read the file first
//   fs.readFile("./students.json", "utf-8", (err, data) => {
//     if (err) return res.status(500).send("Could not read file");

//     // . Parse existing data or start with empty array
//     const students = JSON.parse(data || "[]");

//     //  Create and push new student
//     const newStudent = {
//       id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
//       name,
//       branch,
//     };
//     students.push(newStudent);

//     //  Write the WHOLE array back to the file (Overwriting)
//     fs.writeFile(
//       "./students.json",
//       JSON.stringify(students, null, 2),
//       (err) => {
//         if (err) return res.status(500).send("Error writing to file");

//         //  ONLY send response inside the success callback
//         return res
//           .status(201)
//           .json({ message: "Registered!", student: newStudent });
//       },
//     );
//   });
// });

app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});




























// app.post("/student/register",(req,res)=>{
//     const{name,branch}=req.body;
//     if(!name|| !branch) return res.status(400).send("Details missing");
//     //send the file first
//     fs.readFile("./student.json","utf-8",(err,data)=>{
//         if(err) return res.status(500).send("could not read file");

//         //parsing existing data or start with empty array
//         const student=JSON.parse(data||"[]");

//         // create and push new student
//         const newStudent={
//             id: student.length>0?student[student.length-1].id+1:1,
//             name,
//             branch
//         };
//         student.push(newStudent);

//         //write the whole array back to the file (overwriting)
//         fs.writeFile("./student.json",JSON.stringify(student,null,2), (err)=>{
//             if(err) return res.status(500).send("error in writing the file");

//             //only send response inside the success callback
//             return res
//                 .status(201)
//                 .json({message:"Registered!!!", student:newStudent});
//         })

//     })
// })


// app.put("/students/.id",(req,res)=>{
//   const userId = parseInt(req.params.id);
//   const foundIndex = students.findIndex(s=>s.id === userId);

//   if(founIndex==-1){
//     return res.staus (404).send("student not found")
//   }
//  students[foundIndex]={...PORT.students[foundIndex], ...req.body};

//  const result = {message:"updated successfully", students: students};
//  return res.status(200).json(result);
// })





















