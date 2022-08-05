import { createStore } from "vuex";
import axios from "axios";
import paginationStore from "./modules/paginationStore";

export const store = createStore({
  state() {
    return {
      todoList: [],
      allDoneTodo: [],
      updateElement: { updateState: false },
    };
  },
  modules: {
    pagination: paginationStore,
  },
  /* our methods to change state. */
  mutations: {
    changeComponent(state, compName) {
      state.selectComponent = compName;
    },
    //addNewTodo method will work for add new todo or update old todo
    addNewTodo(state, todo) {
      //JS Object Destructiring to take same part of object

     /*  const destructuredTodo = ((a) => (
        console.log(a)
         ))("todo");
         >>>>> todo */
         
      const destructuredTodo = (({ unique, title, content, category, degree, image, completed, createAt }) => ({
        unique,
        title,
        content,
        category,
        degree,
        image,
        completed,
        createAt,
      }))(todo); //Arrow IIEF
      if (todo.addState === "add") {
        axios
          .post("http://localhost:3000/add-todo", destructuredTodo)
          .then((response) => {
            console.log("GELEN RESPONSE", response);
          })
          .catch((err) => {
            console.log("GELEN ERROR:", err);
          });
        state.todoList.push(destructuredTodo);
      } else if (todo.addState === "update") {
        state.todoList.push(destructuredTodo);
        state.updateElement = { updateState: false };
        axios
          .put("http://localhost:3000/update-todo/" + String(todo.unique), destructuredTodo)
          .then((response) => {
            console.log("GELEN RESPONSE", response);
          })
          .catch((err) => {
            console.log("GELEN ERROR:", err);
          });
      }
    },
    //donetodo will work when user done todo
    doneTodo(state, todo) {
      const tempTodoList = state.todoList.filter((item) => {
        return todo.unique !== item.unique;
      });
      state.todoList = [...tempTodoList];
      state.allDoneTodo.push({ ...todo });
      axios
        .put("http://localhost:3000/add-todo/" + String(todo.unique))
        .then((response) => {
          console.log("GELEN RESPONSE", response);
        })
        .catch((err) => {
          console.log("GELEN ERROR:", err);
        });
    },
    //updateTodo will work when user update an old todo
    // when we update a todo we delete it on front-end aftere update we add a new todo with updated info
    updateTodo(state, todo) {
      state.updateElement = { updateState: true, ...todo };
      const temporalTodoList = state.todoList.filter((item) => {
        return todo.unique !== item.unique;
      });
      state.todoList = [...temporalTodoList]; // we delete that todo from our list now add with new info
    },
    //DELETE will work for remove a todo
    todoDelete(state, todo) {
      if (todo.completed) {
        const temporalallDoneTodo = state.allDoneTodo.filter((item) => {
          return todo.unique !== item.unique;
        });
        state.allDoneTodo = [...temporalallDoneTodo];
      } else {
        const temporalTodoList = state.todoList.filter((item) => {
          return todo.unique !== item.unique;
        });
        state.todoList = [...temporalTodoList];
      }
      // after delete on front-end also delete from database
      axios
        .delete("http://localhost:3000/add-todo/" + String(todo.unique))
        .then((response) => {
          console.log("GELEN RESPONSE", response);
        })
        .catch((err) => {
          console.log("GELEN ERROR:", err);
        });
    },
  },
  // getters will provide getting data in another compo. on store
  getters: {
    allTodoList: (state) => state.todoList,
    doneTodoList: (state) => state.allDoneTodo,
    updateFromStore: (state) => state.updateElement,
  },
  actions: {
    getDatabases: function (context, todos) {
      todos.data.forEach((item) => {
        item.completed === true ? context.state.allDoneTodo.push(item) : context.state.todoList.push(item);
      });
    },
  },
});
