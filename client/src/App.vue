<template>
  <button
    @click="
      language == 'turkish' ? (language = 'english') : (language = 'turkish')
    "
    class="main-app__button"
  >
    <span>{{ language == "turkish" ? "EN" : "TR" }}</span>
    <font-awesome-icon icon="fa-solid fa-language" />
  </button>
  <PreLoader v-if="showPreloader" />
  <RegisterTodo :language="language" />

  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
</template>

<script>
import PreLoader from "./components/PreLoader.vue";
import RegisterTodo from "./pages/RegisterTodo.vue";

export default {
  name: "App",
  data: function () {
    return {
      showPreloader: true,
      language: "english",
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
    RegisterTodo,
  },
};
</script>

/* background-color: #e0e0e0; */
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 75px;
  background: rgb(255, 0, 219);
  background: linear-gradient(
    90deg,
    rgba(255, 0, 219, 1) 0%,
    rgba(0, 255, 239, 1) 50%,
    rgba(0, 255, 149, 1) 100%
  );
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
