<template>
  <button class="main-app__button">
    <span>TR</span>
    <font-awesome-icon icon="fa-solid fa-language" />
  </button>
  <PreLoader v-if="showPreloader" />
  <TodoInput />

  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
</template>

<script>
import PreLoader from "./components/PreLoader.vue";
import TodoInput from "./components/TodoInput.vue";

export default {
  name: "App",
  data: function () {
    return {
      showPreloader: true,
    };
  },
  created() {
    //after 2 seconds, showPreloader will be false so we can not see preloader compo anymore.
    setTimeout(() => {
      this.showPreloader = false;
    }, 2000);
  },

  components: {
    PreLoader,
    TodoInput,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #e0e0e0;
}
.main-app__button {
  position: fixed;
  top: 25px;
  right: 25px;
  border-radius: 19px;
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  box-shadow: 5px 5px 10px #c7c7c7, -5px -5px 10px #f9f9f9;
  color: black;
  font-size: 1.2rem;
  font-weight: 900;
}
.main-app__button span {
  margin: 10px;
}
</style>
