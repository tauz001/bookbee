const express = require("express")
const hostRouter = express.Router()

// Local Module
const hostController = require("../controllers/hostController")

hostRouter.post("/", hostController.createHostedTrip)
hostRouter.get("/", hostController.getTripList)

module.exports = hostRouter
