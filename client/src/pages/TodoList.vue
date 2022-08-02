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
      <div class="todo-app__card" v-for="todo in (activeButton==='active' ? [...allTodoList].slice((activeCurrentPage-1)*5, (activeCurrentPage*5)) : [...doneTodoList].slice((doneCurrentPage-1)*5, (doneCurrentPage*5)))" :key="todo.unique">
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
         <div>{{todo.createAt}}</div>
        </div>
         <div class="todo-app__card-buttons" :class="{'todo-app__active-buttons-done':todo.completed}" >
            <button v-if="!todo.completed"  @click="todoDoneMethod(todo)">
              {{language == 'turkish' ? "YAPILDI" : "DONE"}}
              <font-awesome-icon icon="fa-solid fa-circle-check" />
            </button>
            <router-link to="/">
              <button v-if="!todo.completed && !todo.updatedState" @click="todoUpdateMethod(todo)" >{{language == 'turkish' ? "GÜNCELLE" : "UPDATE"}}
              <font-awesome-icon icon="fa-solid fa-square-pen" />
            </button>
            </router-link>
            <button  @click="todoDeleteMethod(todo)"  >{{language == 'turkish' ? "SIL" : "DELETE"}}
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
          </div>
    </div>
  </div>
  <TodoPagination :language="language" :activeButton="activeButton"/>
    <!-- <router-link class="todo-app__show-list" to="/">TODO FORM</router-link> -->
    <button @click="goBackButton" class="todo-app__show-list" >GERİ DÖN</button>
  <router-view></router-view>
  <div>ACTİVE CURRENT:{{activeCurrentPage}}</div>
  <div>DONE CURRENT:{{doneCurrentPage}}</div>
  <div>ACTİVE PAGINATION: {{activePaginationCount}}</div>
</template>

<script>
import IMGDefault from "../assets/default_todo.png"
import TodoPagination from "../components/TodoPagination.vue";

import { mapGetters } from "vuex";
export default {
  data:function () {
    return{
      defaultImage:IMGDefault,
      activeButton:"active",
    }
  },
  mounted() {
    console.log("Mounted todos:", this.allTodoList)
  },
  props:["language"],
  methods:{
    todoDoneMethod:function (todo) {
      if(((this.activeCurrentPage -1) * 5) + 1 == this.allTodoList.length && this.activePaginationCount>1) {
        this.$store.commit("pagination/changeActivePage", -1)
      }
      this.$store.commit("doneTodo",{...todo, completed:true})
      this.activeButton="done"
      this.$store.commit("pagination/changeActivePaginationCount", Math.ceil(this.allTodoList.length / 5))
      this.$store.commit("pagination/changeDonePaginationCount", Math.ceil(this.doneTodoList.length / 5))
      // to change activePage after done last todo in that page
    },
    goBackButton(){
      this.$router.push({
        name:"RegisterTodo",
      })
    },
    todoUpdateMethod:function(todo){
      this.$store.commit("changeComponent", "RegisterTodo")
      this.$store.commit("updateTodo", {...todo});
    },
    todoDeleteMethod(todo){
      //aşağıdaki if active page de kalan son todo silindiğinde devreye girecek ve active page bir öncekine geçer
   
      this.$store.commit("todoDelete", todo)
      if(((this.activeCurrentPage -1) * 5) == this.allTodoList.length && this.activePaginationCount>1) {
        this.$store.commit("pagination/changeActivePage", -1)
      }
      if(((this.doneCurrentPage -1) * 5)  == this.doneTodoList.length && this.activePaginationCount>1) {
        this.$store.commit("pagination/changeDonePage", -1)
      }
      this.$store.commit("pagination/changeActivePaginationCount", Math.ceil(this.allTodoList.length / 5))
      this.$store.commit("pagination/changeDonePaginationCount", Math.ceil(this.doneTodoList.length / 5))
    },
    changeCurrentPage: function(){
      if(((this.activeCurrentPage -1) * 5) + 1 == this.allTodoList.length) {4
        this.$store.commit("pagination/changeActivePage", -1)
      }
    }
 
  },
  computed:{
    /* burada mapGetters spread yaptık ki  kendi computedlarımızı da yazabilelim*/
      ...mapGetters({
        allTodoList:"allTodoList", 
        doneTodoList: "doneTodoList",
        activeCurrentPage:"pagination/activeCurrentPage",
        doneCurrentPage:"pagination/doneCurrentPage",
        activePaginationCount: "pagination/activePaginationCount",
        donePaginationCount: "pagination/donePaginationCount",

    })
  },
  components:{
    TodoPagination,
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
  grid-template-columns: repeat(auto-fill, minmax(500px, 0.75fr));
  gap:2.5rem;
  margin-left:25px;
  margin-right:25px;
  padding-bottom:300px;

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
  width: 350px;
  min-height: 350px;
  margin:0 auto;
  margin-top:10px;
  margin-bottom:10px;

}

.todo-app__card-image img{
  width: 350px;
  max-height: 350px;
  margin:0 auto;
  margin-top:10px;

}
.todo-app__card-content{
  display: flex;
  flex-direction: column;
  align-items: center;
  height:100%;
  margin-top:10px;


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
  margin-top:10px;
}
.todo-app__card-buttons button{
  width:150px;
  border-radius:15px;
  height:35px;
  box-shadow:  8px 8px 9px #5a5a5a,
             -8px -8px 9px #ffffff;
  color: black;
  font-weight: bold;
  margin-bottom:10px;
}
.todo-app__active-buttons-done {
  justify-content: center;
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