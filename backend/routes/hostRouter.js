const express = require("express")
const hostRouter = express.Router()

// Local Module
const hostController = require("../controllers/hostController")

hostRouter.post("/", hostController.createHostedTrip)
// todoItemsRouter.get("/", todoItemsController.getTodoItems);
// todoItemsRouter.delete("/:id", todoItemsController.deleteTodoItem);
// todoItemsRouter.put("/:id/completed", todoItemsController.markCompleted);

module.exports = hostRouter
