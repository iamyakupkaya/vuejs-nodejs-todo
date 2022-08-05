const router = require("express").Router();
/* const middleTodoValidator = require("../middlewares/middleTodoValidator");
 */
const { createTodo, allTodos, doneTodo, deleteTodo, updateTodo } = require("../controllers/todoController");

router.post("/add-todo", createTodo);

//UPDATE A TODO JUST FOR "DONE"
router.put("/add-todo/:id", doneTodo);

// UPDATE A TODO WITH ALL INFORTMATIONS ABOUT THAT TODO
router.put("/update-todo/:id", updateTodo);

router.delete("/add-todo/:id", deleteTodo);

router.get("/all-todos", allTodos);

module.exports = router;
