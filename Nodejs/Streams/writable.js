const fs = require("fs");
const path = require("path"); // Use  to select the path of file.

const inputFilePath = path.join(__dirname,"input.txt");

const outputFilePath = path.join(__dirname,"output.txt");

const inputStream = fs.createReadStream(inputFilePath,"utf-8");

inputStream.on("data",(chunk)=>{
  console.log("Data is reading in chunks:",chunk);
})

// Method-2

// const asyncFile=fs.readFile("input.txt","utf-8", (err,data)=>{
//     if(err){
//         console.log("error in file reading", err);

//     }
//     else{
//         console.log("file reading successfull", data)
//     }
// })
// console.log(asyncFile)

