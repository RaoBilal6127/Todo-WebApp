const express = require("express");
const todo = require("../controllers/todo");
const router = express.Router();

router.get("/", todo.homeController);

router.post("/add-todo", todo.addTodoController);

router.get("/add-todo", todo.addTodoFormController);

router.get("/update-todo", todo.updateTodoFormController);

router.get("/delete-todo", todo.deleteTodoPageController);

router.post("/update-todo/:id", todo.updateTodoController);

router.get("/confirm-delete", todo.deleteTodoController);
module.exports = router;