// Core Module

// External Module
const express = require("express")
const cors = require("cors")

//Local Module
const hostRouter = require("./routes/hostRouter")

const {default: mongoose} = require("mongoose")
const app = express()
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
// app.use((req, res, next) => {
//   console.log(req)
//   next()
// })
app.use("/api/hostingTrip", hostRouter)

const PORT = 3000
const DB_PATH = "mongodb+srv://root:tauz001@bookbee.4xj0vww.mongodb.net/?retryWrites=true&w=majority&appName=BookBee"

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo")
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.log("Error while connecting to Mongo: ", err)
  })
