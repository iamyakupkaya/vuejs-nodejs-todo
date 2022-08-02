const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    unique: {
      type: String,
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    content: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    degree: {
      type: String,
      default: "low",
    },
    image: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createAt: {
      type: String,
    },
  },
  { collection: "todos", timestamps: false }
);

const Todo = mongoose.model("todo_app", todoSchema);

module.exports = Todo;
