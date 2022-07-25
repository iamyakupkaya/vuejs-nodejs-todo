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
  <RegisterTodo key="1" v-if="selectedComponent == 'RegisterTodo' ? true : false" :language="language"/>
  <TodoList v-if="selectedComponent == 'TodoList' ? true : false" :language="language"/>

  <!--  -->


  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

  <button v-if="!updateFromStore.updateState" :class="{'buttonMargin': selectedComponent == 'TodoList'}" @click="changeComponent(selectedComponent == 'RegisterTodo' ? 'TodoList' : 'RegisterTodo')" class="todo-app__show-list">
    {{
      (language == "turkish" && selectedComponent == 'RegisterTodo')
        ? "TODO LİSTESİNİ GÖSTER"
        : (language == "english" && selectedComponent == 'RegisterTodo') 
        ? "SHOW MY TO DO LIST" 
        : (language == "turkish" && selectedComponent == 'TodoList')
        ? "TODO EKLEME FORMUNU GÖSTER"
        : "SHOW MY TO DO FORM"
    }}
  </button>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./components/PreLoader.vue";
import RegisterTodo from "./pages/RegisterTodo.vue";
import TodoList from "./pages/TodoList.vue";


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
  methods:{
    changeComponent(compName){
      this.$store.commit("changeComponent", compName)

    }
  },
  components: {
    PreLoader,
    RegisterTodo,
    TodoList,
    
  },
    computed:{
    ...mapGetters(["selectedComponent", "updateFromStore"])
  }

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

.todo-app__show-list {
  background-color: rgba(220, 0, 255, 0.5);
  width: 50%;
  min-width: 750px;
  height: 50px;
  border-radius: 15px;
  color: black;
  font-weight: bold;
}
.todo-app__show-list:hover {
  background-color: rgba(220, 0, 255, 1);
  transition: background-color 5 linear;
  
}
.buttonMargin{
  margin-top:50px;
}
.todo-app__hr {
  border: 1px solid red;
  margin-bottom: 1rem;
}
</style>
