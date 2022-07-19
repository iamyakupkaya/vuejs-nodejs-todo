<template>
  <div class="todo-app">
    <h1>To Do</h1>
    <hr />
    <div>
      <input class="todo-app__input" placeholder="Title of ToDo" />
      <br />
      <br />
      <textarea
        rows="4"
        class="todo-app__textarea todo-app__input"
        placeholder="what do you want to do?"
      />
    </div>
    <h4>Is it important?</h4>

    <div :style="{ display: 'flex' }">
      <label :style="{ 'background-color': 'rgba(255, 0, 0, 0.5)' }">
        <input type="radio" name="light" checked />
        <span class="text">HIGH</span>
      </label>
      <label :style="{ 'background-color': 'rgba(255, 205, 0, 0.5)' }">
        <input type="radio" name="light" checked />
        <span class="text">MEDIUM</span>
      </label>
      <label :style="{ 'background-color': 'rgba(16, 193, 2, 0.5)' }">
        <input type="radio" name="light" checked />
        <span class="text">LOW</span>
      </label>
    </div>
    <br />
    <button class="todo-app__submit-button" type="submit">
      <span>ADD</span>
      <font-awesome-icon icon="fa-solid fa-plus" size="xl" />
    </button>
    <br />
    <br />
    <div class="todo_app__active-buttons">
      <button>ACTIVE</button>
      <button>DONE</button>
      <button>REMOVED</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.todo-app {
  width: 50%;
  min-width: 750px;
  margin: 0 auto;
  border-radius: 50px;
  box-shadow: inset 13px 13px 24px #797979, inset -13px -13px 24px #ffffff;
}
.todo-app__input {
  width: 75%;
  height: 2.5rem;
  background-color: #e0e0e0;
  border-radius: 20px;
  border-width: 2px;
  border-color: black;
  color: black;
}

.todo-app__textarea {
  resize: vertical;
  min-height: 100px;
  max-height: 300px;
}
label {
  border-radius: 50px;
  text-align: center;
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  margin: 10px auto;
  cursor: pointer;
  position: relative;
  font-weight: 600;
  color: black;
}
label input {
  width: 20px;
  height: 20px;

  margin: auto 10px;
}

.todo-app__submit-button {
  width: 200px;
  font-weight: 900;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(0, 17, 255, 0.5);
  color: black;
}
.todo-app__submit-button span {
  margin: 15px;
}
.todo_app__active-buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.todo_app__active-buttons button {
  background-color: blue;
}
</style>
