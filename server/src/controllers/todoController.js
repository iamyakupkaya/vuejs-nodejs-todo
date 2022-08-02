//const { validationResult } = require("express-validator");
const Todo = require("../models/todoModel");
//const bcrypt = require("bcrypt");

const allTodos = async (req, res, next) => {
  try {
    const result = await Todo.find({});
    res.json(result);
  } catch (error) {
    console.log("HATA..!", error.message);
    res.status(404).json({ message: error.message });
  }
};

const createTodo = async (req, res, next) => {
  //const errors = validationResult(req);
  try {
    const addingTodo = new Todo(req.body);
    await Todo.create(addingTodo);
    //res.json(result);
  } catch (error) {
    console.log("HATA..!", error.message);
    res.status(404).json({ message: error.message });
  }
};

const doneTodo = async (req, res, next) => {
  const urlID = req.params.id;
  try {
    const filter = { unique: urlID };
    const update = { completed: true };
    await Todo.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log("HATA..!", error.message);
    res.status(404).json({ message: error.message });
  }
};

const deleteTodo = async (req, res, next) => {
  const urlID = req.params.id;
  try {
    const filter = { unique: urlID };
    await Todo.deleteOne(filter);
  } catch (error) {
    console.log("HATA..!", error.message);
    res.status(404).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  const urlID = req.params.id;
  try {
    const filter = { unique: urlID };
    const update = { ...req.body };
    await Todo.findOneAndUpdate(filter, update);
  } catch (error) {
    console.log("HATA..!", error.message);
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createTodo,
  allTodos,
  doneTodo,
  deleteTodo,
  updateTodo,
};
