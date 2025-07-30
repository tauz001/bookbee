const express = require("express")

const storeRouter = express()
const storeController = require("../controllers/storeController")

storeRouter.post("/", storeController.createUserSeatBooking)
