const router = require("express").Router();
/* const middleTodoValidator = require("../middlewares/middleTodoValidator");
 */
const { createTodo, allTodos, doneTodo, deleteTodo, updateTodo } = require("../controllers/todoController");

//GETs
/*  router.get("/all-todos", allTodos);
 */
router.post("/add-todo", createTodo);

router.put("/add-todo/:id", doneTodo);

router.put("/update-todo/:id", updateTodo);

router.delete("/add-todo/:id", deleteTodo);

router.get("/all-todos", allTodos);

module.exports = router;
