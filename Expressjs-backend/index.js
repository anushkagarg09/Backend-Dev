const express = require('express');
const app = express();
const PORT = 8000;
app.use(express.json());

const students = [
  { id: 1, name: "Anushka", branch: "CS", email:"anush@gmail.com"},
  { id: 2, name: "Komal", branch: "ECE",email:"bsjbdj@dwkdk"},
  { id: 3, name: "teesha", branch: "IT",email:"gdg2dgu@gmail.com"}
];

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

// ✅ Get all students OR filter by branch
app.get("/students", (req, res) => {
  const branch = req.query.branch;

  if (!branch) {
    return res.json(students); // 
  }

  const foundStudents = students.filter(
    (s) => s.branch === branch
  );

  res.json(foundStudents);
});

// ✅ Get student by ID
app.get("/students/:id", (req, res) => {
  const id = req.params.id;

  const foundStudent = students.find(
    (s) => s.id == id
  );

  if (!foundStudent) {
    return res.status(404).send("Student not found");
  }

  res.json(foundStudent);
});


app.post("/students/register", (req, res) => {
  if (!data || !data.name || !data.branch || !data.id) {
    return res.status(400).send("Please provide student details");
  }

  const validId = students.find(students => students.id === data.id) 
  if(validId) {
    return res.status(409).send("id already exist")
  }

  students.push(data);
  res.status(201).json({
    message: "Student registered successfully",
    student: data
  });
});

app.put("/students/:id",(req, res) =>{
  const Id = Number(req.params.id);
  const index = students.findIndex(s => s.id === Id) // 1
  const user = students[index];
 
  if(!user) {
    res.status(404).json("User Not found");
    return;
  }

  students[index] = { ...students[index], ...req.body
  }
  res.status(200).json({
    message:"User Updated Sucessfully",
    student: students[index]
  })
})

// app.put("/students/rest/:id",(req,res) =>{
//   const Id = Number(req.params.id);
//   const index = students.findIndex(s => s.id === Id) // 1
//   const user = students[index];

//   if(!user) {
//     res.status(404).json("User Not found");
//     return;
//   }
//   const {id, ...updates} = req.body;
//   students[index]= {...students[index], ...updates}
//   res.status(200).json({
//     message:"User Updated Sucessfully",
//     student: students[index]
//   })
// })
// Data ko resource se update krne ke liye

app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});
