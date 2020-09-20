const { Router } = require("express");
const router = Router();
const Todo = require("../models/Todo.js");

router.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.render("index", {
    title: "Todos List",
    isIndex: true,
    todos: todos,
  });
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create todo",
    isCreate: true,
  });
});

router.post("/create", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });
  await todo.save();
  res.redirect("/");
});

router.post("/complete", async (req, res) => {
  const todo = await Todo.findById(req.body.id);
  todo.completed = true;
  await todo.save();
  console.log("complete");
  res.redirect("/");
});

module.exports = router;
