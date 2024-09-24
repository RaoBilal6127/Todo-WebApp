const Todo = require("../models/Todo");
const moment = require("moment");

const homeController = async (req, res, next) => {
    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 });
        res.locals.moment = moment;
        res.render("index", { title: "Add Todo", todos: todos });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addTodoController = async (req, res, next) => {
    const { title, desc } = req.body;
    try {
        const newTodo = Todo({ title: title, desc: desc });
        if (!title) {
            res.status(400).json({ message: "Title is required" });
        }
        await newTodo.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTodoFormController = (req, res, next) => {
    try {
        res.render("newTodo", { title: "New Todo" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateTodoFormController = async (req, res, next) => {
    try {
        const { id } = req.query;
        todo = await Todo.findById(id);
        res.render("updateTodo", { title: "Update Todo", todo: todo });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteTodoPageController = (req, res, next) => {
    try {
        const { id } = req.query;
        res.render("deleteTodo", { title: "Delete Todo", id: id });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateTodoController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, desc } = req.body;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todo.title = title;
        todo.desc = desc;

        await todo.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTodoController = async (req, res, next) => {
    try {
        const { id, confirm } = req.query;

        if (confirm === "yes") {
            await Todo.findByIdAndDelete(id);
        }

        res.redirect("/");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    homeController, addTodoController, addTodoFormController,
    updateTodoFormController, deleteTodoPageController,
    updateTodoController,
    deleteTodoController
};