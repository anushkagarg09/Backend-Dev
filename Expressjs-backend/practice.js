const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// const PORT= 8000;
// app.listen(PORT, () => {
//   console.log("Server is listening on port:8000");
// });
