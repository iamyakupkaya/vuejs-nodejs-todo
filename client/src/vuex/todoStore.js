import { createStore } from "vuex";

export const store = createStore({
  state() {
    console.log("STORE ÇALIŞIYOR::");
    return {
      todoList: [],
      allDoneTodo: [],
      updateElement: { updateState: false },
      selectComponent: "RegisterTodo",
    };
  },
  /* our methods to change state. */
  mutations: {
    changeComponent(state, compName) {
      state.selectComponent = compName;
    },
    //addNewTodo method will work for add new todo or update old todo
    addNewTodo(state, todo) {
      //JS Object Destructiring to take same part of object
      const destructuredTodo = (({
        unique,
        title,
        content,
        category,
        degree,
        image,
        otherCategory,
        doneState,
      }) => ({
        unique,
        title,
        content,
        category,
        degree,
        image,
        otherCategory,
        doneState,
      }))(todo);
      if (todo.addState === "add") {
        state.todoList.push(destructuredTodo);
      } else if (todo.addState === "update") {
        state.todoList.push(destructuredTodo);
        state.updateElement = { updateState: false };
      }
    },
    //donetodo will work when user done todo
    doneTodo(state, todo) {
      const tempTodoList = state.todoList.filter((item) => {
        return todo.unique !== item.unique;
      });
      console.log("update Todo:", todo);
      state.todoList = [...tempTodoList];
      state.allDoneTodo = [{ ...todo }];
    },
    //updateTodo will work when user update an old todo

    updateTodo(state, todo) {
      state.updateElement = { updateState: true, ...todo };
      const temporalTodoList = state.todoList.filter((item) => {
        return todo.unique !== item.unique;
      });
      state.todoList = [...temporalTodoList]; // we delete that todo from our list now add with new info
    },
    //DELETE will work for remove a todo
    todoDelete(state, todo) {
      if (todo.doneState) {
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
    },
  },
  // getters will provide getting data in another compo. on store
  getters: {
    allTodoList: (state) => state.todoList,
    doneTodoList: (state) => state.allDoneTodo,
    updateFromStore: (state) => state.updateElement,
    selectedComponent: (state) => {
      console.log("STOREEEE SELCTED COMPO");
      return state.selectComponent;
    },
  },
});
