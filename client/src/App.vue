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
<router-view :language="language"></router-view>
</template>

<script>
import PreLoader from "./components/PreLoader.vue";
import axios from "axios"

export default {
  name: "App",
  data: function () {
    return {
      showPreloader: true,
      language: "english",
    };
  },
  

  async created(){
    //after 2 seconds, showPreloader will be false so we can not see preloader compo anymore.
    setTimeout(() => {
      this.showPreloader = false;
    }, 2000);

    //
    await axios.get("http://localhost:3000/all-todos").then(response => {
      this.$store.dispatch("getDatabases",response)
    }).catch(err => console.log("EROR", err))

    
  },
  components: {
    PreLoader,

  },
};
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:black;
  margin-top: 50px;
  background-color:transparent;
  width:100vw;
  max-height:100vh;
}
.main-app__button {
  position: fixed;
  top: 25px;
  right: 25px;
  border-radius: 19px;
background: linear-gradient(145deg, #f0f0f0, #cacaca);
box-shadow:  8px 8px 9px #5a5a5a,
             -8px -8px 9px #ffffff;
  color: black;
  font-size: 1.2rem;
  font-weight: 900;
  z-index:999;
}
.main-app__button span {
  margin: 10px;
}

.todo-app__hr {
  border: 1px solid red;
  margin-bottom: 1rem;
}

.todo-app__show-list {
  position:fixed;
  background-color: rgba(220, 0, 255, 0.5);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  color: black;
  font-weight: bold;
  bottom:60px;
  right:25px;
  display:flex;
  justify-content: center;
  align-items: center;
}
.todo-app__show-list:hover {
  background-color: rgba(220, 0, 255, 1);
  transition: background-color 5 linear;
  
}
</style>
