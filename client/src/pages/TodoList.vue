<template>
  <div class="todo-app__active-buttons">
    <button :class="{'todo-app__active' : activeButton === 'active'}" @click="activeButton ==='done' ? activeButton='active' : null  ">
      {{ language == "turkish" ? "AKTİF" : "ACTIVE" }}
      <font-awesome-icon icon="fa-solid fa-hourglass" />
    </button>
    <button :class="{'todo-app__active' : activeButton === 'done'}" @click="activeButton ==='active' ? activeButton='done' : null  ">
      {{ language == "turkish" ? "YAPILDI" : "DONE" }}
      <font-awesome-icon icon="fa-solid fa-circle-check" />
    </button>
  </div>
  <br/>
  <br/>
  <br/>
 <!-- CARD -->
  <div class="todo-app__card-container" >
      <div class="todo-app__card" v-for="(todo, index) in activeButton==='active' ? allTodoList : doneTodoList" :key="index" >
        <div :style="{width:'50%', 'border-top-left-radius':'75px', 'border-top-right-radius':'75px', height:'75px', 'margin':'0 auto', 'margin-bottom':'25px', 'background-color':todo.degree == 'high' ? 'red' : todo.degree=='medium' ? 'yellow' : 'green'}"></div>

        <div class="todo-app__card-image">
          <img :src="todo.image == '' ? defaultImage  : todo.image "/>
        </div>
        <div class="todo-app__card-content">
          <div>
            <h3 class="todo-app__card-content-wrap">{{language == 'turkish' ? "Başlık: " : "Title: "}}</h3><span>{{todo.title.length <=0 ? "none" : todo.title}}</span>
  <hr class="todo-app__hr" />
            <h3 class="todo-app__card-content-wrap">{{language == 'turkish' ? "Kategori: " : "Category: "}}</h3><span>{{todo.category.length <=0 ? "none" : todo.category}}</span>
  <hr class="todo-app__hr" />
            
            <h3 class="todo-app__card-content-wrap">{{language == 'turkish' ? "İçerik: " : "Content: "}}</h3>
            <div class="todo-app__card-content-wrap">{{todo.content.length <=0 ? "none" : todo.content}}</div>
  <hr class="todo-app__hr" />
          </div>
         
        </div>
         <div class="todo-app__card-buttons" >
            <button v-if="!todo.doneState"  @click="todoDoneMethod(todo)">
              {{language == 'turkish' ? "YAPILDI" : "DONE"}}
              <font-awesome-icon icon="fa-solid fa-circle-check" />
            </button>
            <button v-if="!todo.doneState && !todo.updatedState" @click="todoUpdateMethod(todo)" >{{language == 'turkish' ? "GÜNCELLE" : "UPDATE"}}
              <font-awesome-icon icon="fa-solid fa-square-pen" />
            </button>
            <button @click="todoDeleteMethod(todo)"  >{{language == 'turkish' ? "SIL" : "DELETE"}}
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
          </div>
    </div>
  </div>
</template>

<script>
import IMGDefault from "../assets/default_todo.png"
import { mapGetters } from "vuex";
export default {
  data:function () {
    return{
      defaultImage:IMGDefault,
      doneTodos:[],
      activeButton:"active",      
    }
  },
  props:["language"],
  methods:{
    todoDoneMethod:function (todo) { 
      console.log("DONE İÇİNE GELEN TODO", todo)
      this.$store.commit("doneTodo",{...todo, doneState:true})
      this.activeButton="done"
    },

    todoUpdateMethod:function(todo){
      this.$store.commit("changeComponent", "RegisterTodo")
      this.$store.commit("updateTodo", {...todo});
    },
    todoDeleteMethod(todo){
      this.$store.commit("todoDelete", todo)
    }
 
  },
  computed:{
    /* burada mapGetters spread yaptık ki  kendi computedlarımızı da yazabilelim*/
    ...mapGetters(["allTodoList", "doneTodoList"])
  }
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
  top: 0px;
  left: 0;
  z-index:99;
  padding-top:25px;
  padding-bottom:15px;
}
.todo-app__active-buttons button {
  background-color: rgba(220, 0, 255, 0.5);
  width: 150px;
  height: 40px;
  border-radius: 15px;
  color: black;
  font-weight: bold;
}
.todo-app__active{
   background-color: red !important;
}
.todo-app__card-container{
  display:grid;
  margin-top:0px;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap:2.5rem;
  margin-left:25px;
  margin-right:25px;

}

.todo-app__card{
  display:flex;
  flex-direction: column;
    border-radius: 30px;
background: #e0e0e0;
box-shadow:  10px 10px 12px #5a5a5a,
             -10px -10px 12px #ffffff;
}

.todo-app__card-image{
  width: 400px;
  min-height: 400px;
  margin:10px auto;

}

.todo-app__card-image img{
  width: 400px;
  max-height: 400px;
  margin:10px auto;

}
.todo-app__card-content{
  display: flex;
  flex-direction: column;
  align-items: center;
  height:100%;
  margin-top:25px;


}
.todo-app__card-content-wrap{

    white-space: wrap;
      word-wrap: break-word;
  word-break: break-all;




}
.todo-app__card-buttons{
  display:flex;
  justify-content: space-evenly;
  align-items:flex-end;
  margin-top:25px;
}
.todo-app__card-buttons button{
  width:150px;
  border-radius:10px;
}
</style>


   /*   const splitedTodo = (({
        unique,
        title,
        content,
        category,
        degree,
        image,
        otherCategory,
      }) => ({
        unique,
        title,
        content,
        category,
        degree,
        image,
        otherCategory,
      }))(todo); */