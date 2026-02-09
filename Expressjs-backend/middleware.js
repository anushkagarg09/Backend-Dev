const fs = require("fs").promises;
const express = require("express");
const app = express();

app.use(express.json())

const PORT= 8000;
app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});

app.use((req,res,next) => {
  console.log("I am middleware 1.")
  next(); // yeh middleware ko call krega.
})

// Creating custom middleware
app.use((req,res,next) => {
  console.log("I am middleware 2.")
  next(); 
})

const logMiddleware=(req,res,next)=>{
    const start=Date.now();
    res.on("finish", async () => {
    const duration = Date.now() - start;

    const log = `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${res.statusCode} | ${duration}ms\n`;

    try {
      await fs.appendFile("log.txt", log); // creates file if not present
    } catch (err) {
      console.error("Error writing log file:", err.message);
    }
  });
  next();
}
app.use(logMiddleware);

const fileAuthMiddleware = (res,req,next) => {
  console.log("I am checking file access");
  next();
}
app.use((req,res,next) => {
  const token = req.headers["authorization"]
  if(token !== "secrettoken") {
    res.status(401).send("Invalid token")
  }
  next()
})

const readStudentsFromFile = async () => {
  const data = await fs.readFile("./students.json", "utf-8");
  return JSON.parse(data || "[]");
};

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
};

app.get("/students",fileAuthMiddleware , async(req, res) => {
    const students= await readStudentsFromFile();
    return res.status(200).json(students);
})

// app.put("/students/:id", async (req, res) => {
//   try {
//     const userId = parseInt(req.params.id);

//     if (!req.body || Object.keys(req.body).length === 0) {
//       return res.status(400).json({ message: "Empty body not allowed" });
//     }

//     const existingStudents = await readStudentsFromFile();

//     const foundIndex = existingStudents.findIndex((s) => s.id === userId);
//     if (foundIndex === -1) {
//       return res.status(404).send("Student not found");
//     }

//     existingStudents[foundIndex] = {
//       ...existingStudents[foundIndex],
//       ...req.body,
//     };

//     await writeStudentsToFile(existingStudents);

//     return res.status(200).json({
//       message: "Updated Successfully",
//       student: existingStudents[foundIndex],
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// });


// app.delete("/students/:id", async (req, res) => {
//   try {
//     const userId = parseInt(req.params.id);

//     const existingStudents = await readStudentsFromFile();

//     const foundIndex = existingStudents.findIndex((s) => s.id === userId);
//     if (foundIndex === -1) {
//       return res.status(404).send("Student not found");
//     }

//     const deletedStudent = existingStudents.splice(foundIndex, 1);

//     await writeStudentsToFile(existingStudents);

//     return res.status(200).json({
//       message: "Student deleted successfully",
//       deletedStudent: deletedStudent[0],
//     });
//   } catch (err) {
//     return res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// });
