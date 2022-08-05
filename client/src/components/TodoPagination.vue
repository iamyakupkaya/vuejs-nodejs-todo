<template>
   <div
        v-if="allTodoList.length >5 && activeButton  === 'active'"
        class="todo-app__pagination-container">
        <div class="todo-app__pagination-buttons">
            <button :class="{'disable-button':activeCurrentPage<=1}" class="todo-app__pagination-previous" @click="previousPage">PREVIOUS</button>
            <button :class="{'active-button': activeCurrentPage === todo}" class="todo-app__pagination-current"  v-for="todo in activePaginationCount" :key="todo.unique" @click="presentPage(todo)">{{todo}}</button>
            <button :class="{'disable-button': activeCurrentPage === activePaginationCount}" class="todo-app__pagination-next" @click="nextPage">NEXT</button>
        </div>

    </div>
    <div
    v-if="doneTodoList.length >5 && activeButton  === 'done'"
    class="todo-app__pagination-container">
    <div class="todo-app__pagination-buttons">
        <button :class="{'disable-button':doneCurrentPage<=1}" class="todo-app__pagination-previous" @click="previousPage">PREVIOUS</button>
        <button :class="{'active-button': doneCurrentPage === todo}" class="todo-app__pagination-current"  v-for="todo in donePaginationCount" :key="todo.unique" @click="presentPage(todo)">{{todo}}</button>
        <button :class="{'disable-button': doneCurrentPage === donePaginationCount}" class="todo-app__pagination-next" @click="nextPage">NEXT</button>
    </div>

  </div>


</template>


<script>
import { mapGetters } from "vuex";

export default {
    data: function () {

        return {
/*             activePaginationCount:0,
            donePaginationCount:0, */
        }
    },
      created() {
        let activePaginationCount = Math.ceil(this.allTodoList.length / 5)
        let donePaginationCount = Math.ceil(this.doneTodoList.length / 5)

        this.$store.commit("pagination/changeActivePaginationCount", activePaginationCount)
        this.$store.commit("pagination/changeDonePaginationCount", donePaginationCount)
    },
    props:["language", "activeButton"],
    methods:{
        previousPage(){
            if(this.activeCurrentPage>1 && this.activeButton === 'active'){
                this.$store.commit("pagination/changeActivePage", -1)


            }
            else if(this.doneCurrentPage>1 && this.activeButton === 'done'){
                this.$store.commit("pagination/changeDonePage", -1)


            }
        },
        presentPage(todo){

            if(this.activeButton === 'active'){
                this.$store.commit("pagination/changeActivePresentPage", todo)

            }
            else if(this.activeButton === 'done'){
                this.$store.commit("pagination/changeDonePresentPage", todo)


            }
        },
        nextPage(){
            if(this.activeCurrentPage !== this.activePaginationCount && this.activeButton === 'active'){
                                this.$store.commit("pagination/changeActivePage", +1)


            }
            else if(this.doneCurrentPage !== this.donePaginationCount && this.activeButton === 'done'){
                                this.$store.commit("pagination/changeDonePage", +1)

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


}
</script>



<style scoped>

.todo-app__pagination-container{
    width:100%;
    height:50px;
    margin:0 auto;
    margin-top:50px;
    margin-bottom:50px;
    background: linear-gradient(145deg, #f0f0f0, #cacaca);
    box-shadow:  8px 8px 9px #5a5a5a,
                -8px -8px 9px #ffffff;
    transition:translate(0,-50%);
     display:flex;
    align-items: center;
    justify-content: center;
}

.todo-app__pagination-buttons{
    display:flex;
    align-items: center;
    justify-content: center;
    gap:10px;

}
.todo-app__pagination-numbers{
    display:flex;
    align-items: center;
    justify-content: center;
    gap:10px;
}
.disable-button{
        cursor: not-allowed;
        pointer-events: none;

        /*Button disabled - CSS color class*/
        color: #c0c0c0;
        background-color: #ffffff;
}
.active-button{
    background-color:#25e9fe;
            cursor: not-allowed;
        pointer-events: none;
}
</style>