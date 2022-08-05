//const { validationResult } = require("express-validator");
const Todo = require("../models/todoModel");

const { createTrelloCard, deleteTrelloCard, updateTrelloCard } = require("./trelloCard");
//const bcrypt = require("bcrypt");

// **************** GETS METHODS *******************

//Get all todos from database
const allTodos = async (req, res, next) => {
  try {
    const result = await Todo.find({});
    res.json(result);
  } catch (error) {
    console.log("HATA..!", error.message);
    res.status(404).json({ message: error.message });
  }
};

// Create a new todo
const createTodo = async (req, res, next) => {
  //const errors = validationResult(req);
  try {
    const addingTodo = new Todo(req.body);
    const result = await Todo.create(addingTodo);
    const cardData = await createTrelloCard(result);
    await Todo.findByIdAndUpdate({ _id: result.id }, { virtualID: cardData.data.id }, { new: true });
    res.json(result);
  } catch (error) {
    console.log("HATA..!", error.message);
    res.status(404).json({ message: error.message });
  }
};

// turn a todo to "done"
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

// delete a todo
const deleteTodo = async (req, res, next) => {
  const urlID = req.params.id;
  try {
    const filter = { unique: urlID };
    const todo = await Todo.find({ unique: urlID });
    await Todo.deleteOne(filter);
    await deleteTrelloCard(todo[0]);
  } catch (error) {
    console.log("HATA..!", error.message);
    res.status(404).json({ message: error.message });
  }
};

// update a todo's all ınformations
const updateTodo = async (req, res) => {
  const urlID = req.params.id;
  try {
    const filter = { unique: urlID };
    const update = { ...req.body };
    const updatedTodo = await Todo.findOneAndUpdate(filter, update, { new: true });
    await updateTrelloCard(updatedTodo);
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
