<template>
  <div class="todo-app__active-buttons">
    <button>
      {{ language == "turkish" ? "AKTİF" : "ACTIVE" }}
      <font-awesome-icon icon="fa-solid fa-hourglass" />
    </button>
    <button>
      {{ language == "turkish" ? "YAPILDI" : "DONE" }}
      <font-awesome-icon icon="fa-solid fa-circle-check" />
    </button>
  </div>
  <div class="todo-app__card">
    <div class="todo-app__card-image">
      <img :src="allTodoList[0].image == '' ? defaultImage  : allTodoList[0].image "/>
    </div>
  </div>
  <ul>
      <li style="border:2px solid red; margin:10px;" v-for="(todo, index) in allTodoList" :key="index">
        <h1>{{todo.title}}</h1>
        <h2>{{todo.category}}</h2>
        <h3>{{todo.content}}</h3>
      </li>
    </ul>
</template>

<script>
import IMGDefault from "../assets/default_todo.png"
export default {
  data:function () {

    return{
      defaultImage:IMGDefault
    }
  },
  props:["language", "allTodoList"]
};

</script>

<style scoped>
.todo-app__active-buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #e0e0e0;
  position:fixed;
  top: 25px;
  left: 0;
  z-index:99;
}
.todo-app__active-buttons button {
  background-color: rgba(220, 0, 255, 0.5);
  width: 150px;
  height: 40px;
  border-radius: 15px;
  color: black;
  font-weight: bold;
}
.todo-app__card-image{
  width: 300px;
  max-height: 300px;

}
</style>
