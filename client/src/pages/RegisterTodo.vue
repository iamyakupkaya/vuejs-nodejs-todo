<template>
  <div class="todo-app">
    <h1 class="todo-app_title">To Do</h1>
    <hr class="todo-app__hr" />
    <div class="todo-app__select-file">
     <div class="todo-app__select">
       <span :style="{'margin-right':'10px', 'font-weight':'bold', 'margin-bottom':'10px'}">{{ language == "turkish" ? "Kategori" : "Category" }}:</span>

    <select v-model.lazy="selected" v-bind:Category="((selected.toLowerCase() == 'other') || (selected.toLowerCase() == 'diğer')) ? todoInfo.otherCategory=true : todoInfo.category=selected ">
      <option selected disabled value="">
        {{
          language == "turkish" ? "Lütfen birini seçiniz" : "Please select one"
        }}
      </option>
      <option v-for="i in categoryTR.length" :key="i">
        {{ language == "turkish" ? categoryTR[i - 1] : categoryEN[i - 1] }}
      </option>
    </select>

     </div>

    <div>
    <input class="todo-app__file-input" ref="IMGfile" type="file" style="display:none;" @change="onChange($event)" />
    <button class="todo-app__file-button" type="button" @click="$refs.IMGfile.click()">
    {{language == 'turkish'
            ? '**Resim Yükle'
            : '**Upload Picture'}}
            <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
            </button>
    </div>
    </div>

    <div
      v-if="
        (todoInfo.otherCategory || updateFromStore.otherCategory)
      "
    >
      <br />
      <input
      v-if="updateFromStore.otherCategory && !selected"
      v-model.lazy.trim="updateFromStore.category"
        class="todo-app__input"
        :placeholder="
          language == 'turkish'
            ? 'Lütfen kategori başlığı giriniz'
            : 'Please enter the category title'
        "
      />
      <input
      v-else
      v-model.lazy.trim="otherCategory"
        class="todo-app__input"
        :placeholder="
          language == 'turkish'
            ? 'Lütfen kategori başlığı giriniz'
            : 'Please enter the category title'
        "
      />
    </div>
      <br />
    <div >
  <!--     <input
        v-if="updateFromStore.updateState"
        v-model.trim.lazy="updateFromStore.title"
        class="todo-app__input"
        :placeholder="
          language == 'turkish' ? 'Yapılacak konu başlığı' : 'Title of todo'
        "
      /> -->

<!-- ***** TITLE INPUT ****** -->
      <input
        v-model.trim.lazy="valTitle"
        class="todo-app__input"
        :placeholder="
          language == 'turkish' ? 'Yapılacak konu başlığı' : 'Title of todo'
        "
      />
      <br />
      <br />
<!-- ****** CONTENT TEXTAREA ******-->  
      <textarea
        v-model.lazy.trim="valContent"

        rows="4"
        class="todo-app__textarea todo-app__input"
        :placeholder="
          language == 'turkish' ? 'Ne yapacaksın?' : 'What will you do?'
        "
      />
    </div>

    <br />
    

    <div :style="{ display: 'flex' }" class="todo-app__degree-container">
      <label :style="{ 'background-color': 'rgba(255, 0, 0, 1)' }">
        <input v-model="valDegree" type="radio" name="light"   value="high" :checked="valDegree.toLowerCase() === 'high' ? true : false" />
        <span>{{ language == "turkish" ? "YÜKSEK" : "HIGH" }}</span>
        <font-awesome-icon icon="fa-solid fa-angles-up" />
      </label>
      <label :style="{ 'background-color': 'rgba(255, 205, 0, 1)' }">
        <input v-model="valDegree" type="radio" name="light"  value="medium" :checked="valDegree.toLowerCase() === 'medium' ? true : false"  />
        <span>{{ language == "turkish" ? "ORTA" : "MEDIUM" }}</span>
        <font-awesome-icon
          icon="fa-solid fa-down-left-and-up-right-to-center"
        />
      </label>
      <label :style="{ 'background-color': 'rgba(16, 193, 2, 1)' }">
        <input v-model="valDegree" type="radio" name="light" value="low" :checked="valDegree.toLowerCase() === 'low' ? true : false" />
        <span>{{ language == "turkish" ? "DÜŞÜK" : "LOW" }}</span>
        <font-awesome-icon icon="fa-solid fa-angles-down" />
      </label>
    </div>
    <br />
    <button @click="addTodos" class="todo-app__submit-button" type="submit">
      <span v-if="!updateFromStore.updateState">{{ language == "turkish" ? "EKLE" : "ADD" }}</span>
      <span v-else>{{ language == "turkish" ? "GÜNCELLE" : "UPDATE" }}</span>
      <font-awesome-icon icon="fa-solid fa-plus" size="xl" />
    </button>
  <h6 style="padding-bottom:10px; color:red; font-weight:bold;">{{language == "turkish" ? "**:Tamamen opsiyonel / İsteğe bağlı" : "**: Totally optional / if you want to upload"}}</h6>

  </div>
  <hr class="todo-app__hr" />
  <hr class="todo-app__hr" />
 </template>

<script >

import { mapGetters } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default {
    props: ["language"],
    data: function () {
      console.log(this.$store.state.todoList)
      return {
        categoryTR: [
          "Alışveriş",
          "Okul",
          "Yemek",
          "Spor",
          "Ders Çalışma",
          "Diğer",
        ],
        categoryEN: [
          "Shopping",
          "School",
          "Eating",
          "Sport",
          "Studying",
          "Other",
        ],
        selected: "",
        otherCategory:"",
        updateElement:{},
        todoInfo:{
          unique: uuidv4(),
          title:"",
          content:"",
          category:"",
          degree:"",
          image:"",
          otherCategory:false,
        },
        
      };
    },
    methods:{

      //to upload a image
      onChange(e){
       
        const file = e.target.files[0];
        console.log("My file:", file)
        if(file){ // if user select a file..
          this.todoInfo.image = URL.createObjectURL(file);
          this.$refs.IMGfile.value = "";
          console.log("içeriiddeeee ib resim")

        }
         if(this.updateFromStore.updateState){ // if user update todo the user can select new pic to update
          this.updateFromStore.image=URL.createObjectURL(file);
        }
        console.log(this.todoInfo)
      },
      // add new todo or after update editing old todo.
      addTodos(){
        if(this.updateFromStore.updateState){ // if updateState is true, it will update selected todo.
          this.$store.commit("addNewTodo", {...this.updateFromStore, addState:"update", updateState:false})
        }
        else{
          
          if(this.selected.toLowerCase() == 'other' || this.selected.toLowerCase() == 'diğer'){
            this.todoInfo.otherCategory=true;
            this.todoInfo.category = this.otherCategory;
          }
          this.$store.commit("addNewTodo", {...this.todoInfo, addState:"add"}) /*we should use spread operator to cut the reffere num of object*/
        /* because objects are mutables.. for this look at mutable and immutable topics kardeşimmm :)*/
          this.todoInfo.title="";
          this.todoInfo.content="";
          this.todoInfo.otherCategory=false;
          this.todoInfo.category="";
          this.todoInfo.degree="";
          this.todoInfo.image="";
          
        }
      this.$store.commit("changeComponent", "TodoList")

    },

    },
    computed:{
    ...mapGetters(["allTodoList", "updateFromStore"]),
    //valTitle will use in  title input to get data and set data in v-model.
    valTitle:{
        get () {
        if (this.updateFromStore.updateState) {
          return this.updateFromStore.title;
        } 
        else{
          return this.todoInfo.title;
        }
      },
      set (val) {
        if (this.updateFromStore.updateState) {
          this.updateFromStore.title = val
        }
        else{
          this.todoInfo.title = val;
        }
      }
    },
    valContent:{
        get () {
        if (this.updateFromStore.updateState) {
          return this.updateFromStore.content;
        } 
        else{
          return this.todoInfo.content;
        }
      },
      set (val) {
        if (this.updateFromStore.updateState) {
          this.updateFromStore.content = val
        }
        else{
          this.todoInfo.content = val;
        }
      }
    },
    valDegree:{
        get () {
        if (this.updateFromStore.updateState) {
          return this.updateFromStore.degree;
        } 
        else{
          return this.todoInfo.degree;
        }
      },
      set (val) {
        if (this.updateFromStore.updateState) {
          this.updateFromStore.degree = val
        }
        else{
          this.todoInfo.degree = val;
        }
      }
    },

      
    }
  };
</script>

<style scoped>
@import "../css/styleRegisterTodo.css";
</style>

      /* valTitle:{
        get () {
        if (this.updatedTodoInfo.updateState) {
          console.log("GET İÇERİSİ İF")
          return this.updateElement.title;
        } 
        else{
          console.log("GET İÇERİSİ ELSE")

          return this.todoInfo.title;
        }
      },
      set (val) {
        if (this.updatedTodoInfo.updateState) {
          console.log("SET İÇERİSİ İF")

          this.updatedTodoInfo.title = val
        }
        else{
          console.log("SET İÇERİSİ ELSE")

          this.todoInfo.title = val;
        }
      }
    } */


    /* 


    valTitle:{
        get () {
        if (this.$store.state.updateElement.updateState) {
          console.log("GET İÇERİSİ İF")
          return this.$store.state.updateElement.title;
        } 
        else{
          console.log("GET İÇERİSİ ELSE")

          return this.todoInfo.title;
        }
      },
      set (val) {
        if (this.$store.state.updateElement.updateState) {
          console.log("SET İÇERİSİ İF")
          this.$store.state.updateElement.title = val
        }
        else{
          console.log("SET İÇERİSİ ELSE")

          this.todoInfo.title = val;
        }
      }
    }



    */