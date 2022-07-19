<template>
  <div class="todo_app__active-buttons">
    <button>
      {{ language == "turkish" ? "AKTİF" : "ACTIVE" }}
      <font-awesome-icon icon="fa-solid fa-hourglass" />
    </button>
    <button>
      {{ language == "turkish" ? "YAPILDI" : "DONE" }}
      <font-awesome-icon icon="fa-solid fa-circle-check" />
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.todo_app__active-buttons {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 10px;
}
.todo_app__active-buttons button {
  background-color: rgba(220, 0, 255, 0.5);
  width: 150px;
  height: 30px;
  border-radius: 15px;
  color: black;
  font-weight: bold;
}
</style>
