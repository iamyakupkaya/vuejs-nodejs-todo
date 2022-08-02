<template>
  <div class="todo-app">
    <h1 class="todo-app_title">To Do</h1>
    <hr class="todo-app__hr" />
    <div class="todo-app__select-file">
     <div class="todo-app__select">
       <span :style="{'margin-right':'10px', 'font-weight':'bold', 'margin-bottom':'10px'}">{{ language == "turkish" ? "Kategori" : "Category" }}:</span>

<!-- ****** SELECT ELEMENT***** -->
 <select
 v-if="updateFromStore.updateState && ([...categoryTR].filter(item => item !=='diğer').includes(updateFromStore.category) || [...categoryEN].filter(item => item !=='other').includes(updateFromStore.category))"
    v-model.lazy="valSelectCategory" 
    v-bind:otherCategoryState="(valSelectCategory === 'other' || valSelectCategory === 'diğer') ? otherCategoryState=true : otherCategoryState=false"
    name="register_category"
    >
      <option selected disabled value="">
        {{
          language == "turkish" ? "Lütfen birini seçiniz" : "Please select one"
        }}
      </option>
      <option v-for="i in categoryTR.length" :key="i">
        {{ language == "turkish" ? categoryTR[i - 1] : categoryEN[i - 1] }}
      </option>
    </select>

    <select
 v-else-if="updateFromStore.updateState && (![...categoryTR].filter(item => item !=='diğer').includes(updateFromStore.category) || ![...categoryEN].filter(item => item !=='other').includes(updateFromStore.category))"
    v-model.lazy="valSelectCategory" 
    v-bind:otherCategoryState="([...categoryTR].filter(item => item !=='diğer').includes(valSelectCategory) || [...categoryEN].filter(item => item !=='other').includes(valSelectCategory)) ? otherCategoryState=false : otherCategoryState=true"
    name="register_category"
    
    >
      <option selected disabled value="">
        {{
          language == "turkish" ? "Lütfen birini seçiniz" : "Please select one"
        }}
      </option>
      <option v-for="i in categoryTR.length" :key="i">
        {{ language == "turkish" ? categoryTR[i - 1] : categoryEN[i - 1] }}
      </option>
    </select>



    <select
    v-else
    v-model.lazy="valSelectCategory" 
    v-bind:otherCategoryState="(valSelectCategory === 'other' || valSelectCategory === 'diğer') || updateFromStore.updateState && (![...categoryTR].filter(item => item !=='diğer').includes(updateFromStore.category) || ![...categoryEN].filter(item => item !=='other').includes(updateFromStore.category)) ? otherCategoryState=true : otherCategoryState=false"
    name="register_category"
    
    >
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
<!-- **** upload image **** --> 
    <div>
      <input class="todo-app__file-input" ref="IMGfile" type="file" style="display:none;" @change="onChange($event)" 
     name="register_image"
      
      />
        <button class="todo-app__file-button" type="button" @click="$refs.IMGfile.click()">
        {{language == 'turkish'
                ? '**Resim Yükle'
                : '**Upload Picture'}}
                <font-awesome-icon icon="fa-solid fa-cloud-arrow-up" />
                </button>
    </div>
    </div>
    
<!-- ******* if other category is selected, this input will be worked ******* -->
    <div v-if="otherCategoryState">
      <br/>
      <input 
      v-model.lazy.trim="valInputCategory"
      name="register_category"
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

<!-- ***** TITLE INPUT ******  valTitle-->
      <input
        v-model.trim.lazy="valTitle"
        name="register_title"
        class="todo-app__input"
        :placeholder="
          language == 'turkish' ? 'Yapılacak konu başlığı' : 'Title of todo'
        "
      />
      <br />
      <br />
<!-- ****** CONTENT TEXTAREA ******-->  
      <textarea
      name="register_content"
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
        <input v-model="valDegree" type="radio" name="register_degree"   value="high" :checked="valDegree.toLowerCase() === 'high' ? true : false" />
        <span>{{ language == "turkish" ? "YÜKSEK" : "HIGH" }}</span>
        <font-awesome-icon icon="fa-solid fa-angles-up" />
      </label>
      <label :style="{ 'background-color': 'rgba(255, 205, 0, 1)' }">
        <input v-model="valDegree" type="radio" name="register_degree"  value="medium" :checked="valDegree.toLowerCase() === 'medium' ? true : false"  />
        <span>{{ language == "turkish" ? "ORTA" : "MEDIUM" }}</span>
        <font-awesome-icon
          icon="fa-solid fa-down-left-and-up-right-to-center"
        />
      </label>
      <label :style="{ 'background-color': 'rgba(16, 193, 2, 1)' }">
        <input v-model="valDegree" type="radio" name="register_degree" value="low" :checked="valDegree.toLowerCase() === 'low' ? true : false" />
        <span>{{ language == "turkish" ? "DÜŞÜK" : "LOW" }}</span>
        <font-awesome-icon icon="fa-solid fa-angles-down" />
      </label>
    </div>
    <br />
  <router-link to="/todo">
        <button @click="addTodos" class="todo-app__submit-button" type="submit">
      <span v-if="!updateFromStore.updateState">{{ language == "turkish" ? "EKLE" : "ADD" }}</span>
      <span v-else>{{ language == "turkish" ? "GÜNCELLE" : "UPDATE" }}</span>
      <font-awesome-icon icon="fa-solid fa-plus" size="xl" />
    </button>
  </router-link>
  <h6 style="padding-bottom:10px; color:red; font-weight:bold;">{{language == "turkish" ? "**:Tamamen opsiyonel / İsteğe bağlı" : "**: Totally optional / if you want to upload"}}</h6>

  </div>
  <hr class="todo-app__hr" />
  <hr class="todo-app__hr" />
  <router-link v-if="!updateFromStore.updateState" class="todo-app__show-list" to="/todo">
    <span>{{ language === 'english' ? 'TODO LIST': 'TODO LİSTESİ'}}</span>
  </router-link>
  <router-view></router-view>
 </template>

<script >

import { mapGetters } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default {
    props: ["language"],
    data: function () {
      return {
        categoryTR: [
          "alışveriş",
          "okul",
          "yemek",
          "spor",
          "ders çalışma",
          "diğer",
        ],
        categoryEN: [
          "shopping",
          "school",
          "eating",
          "sport",
          "studying",
          "other",
        ],
        otherCategoryState:false,
        otherCategory:"",
        otherCategoryAgain:"",
        selected: "",
        todoInfo:{
          unique: uuidv4(),
          title:"",
          content:"",
          category:"",
          degree:"low",
          image:"",
          completed:false,
          createAt:""
        },

        
      };
    
    },



    methods:{
      //to upload a image
      onChange(e){
        const imagesType = ["image/apng", "image/avif", "image/gif","image/jpeg", "image/png", "image/svg+xml", "image/webp" ]
        const file = e.target.files[0];
        console.log("myfile", file)
        if(imagesType.includes(file.type)){
          if(file){ // if user select a file..
          this.todoInfo.image = URL.createObjectURL(file);
          this.$refs.IMGfile.value = "";

        }
         if(this.updateFromStore.updateState){ // if user update todo the user can select new pic to update
          this.updateFromStore.image=URL.createObjectURL(file);
        }
        }
        else{
            alert(`${this.language === 'english' ? 'Please select just image type. Like jpg, png, gif etc.' : 'Lütfen sadece fotoğraf uzantılı dosya yükleyiniz. png, gif, jpg vb.'}`)
        }
      },
      // add new todo or after update editing old todo.
      addTodos(){
        let dateObj = new Date();
        let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        let day = ('0' + dateObj.getDate()).slice(-2);
        let year = dateObj.getFullYear();
        let minutes = String(dateObj.getMinutes()).length === 1 ?  '0'+dateObj.getMinutes() : dateObj.getMinutes();
        let hour = String(dateObj.getHours()).length === 1 ?  '0'+dateObj.getHours() : dateObj.getHours();
        let shortDate = day + '.' + month + '.' + year + ' / ' + hour + ':' + minutes;

        if(this.updateFromStore.updateState){ // if updateState is true, it will update selected todo.
          this.$store.commit("addNewTodo", {...this.updateFromStore, addState:"update", updateState:false, createAt:shortDate})
        }
        else{
          if(this.otherCategoryState){
            this.todoInfo.category=this.otherCategory;
          }
          else{
            this.todoInfo.category=this.selected;
          }
          this.$store.commit("addNewTodo", {...this.todoInfo, addState:"add", date:shortDate, createAt:shortDate}) /*we should use spread operator to cut the reffere num of object*/
        /* because objects are mutables.. for this look at mutable and immutable topics kardeşimmm :)*/
          this.todoInfo.title="";
          this.todoInfo.content="";
          this.todoInfo.category="";
          this.todoInfo.degree="";
          this.todoInfo.image="";
          this.todoInfo.date="";
          //---------
          this.selected="";
          this.otherCategory="";
          this.otherCategoryState=false;
          
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
    valSelectCategory:{
        get () {
        //UPDATE VARSA
        if (this.updateFromStore.updateState && !this.otherCategoryState) {
            return this.updateFromStore.category;
        }
        else{
            return this.selected;
        }
      },
      set (val) {
        if (this.updateFromStore.updateState && !this.otherCategoryState) {
          this.updateFromStore.category = val
        }
        //ELSE kısmı ilk todo EKLEME olduğunda çalışacak.
        else{
          //other catecoty seçilirse.
            this.selected=val;
        }
      }
    },
    valInputCategory:{
        get () {
          //UPDATE VARSA
        if (this.updateFromStore.updateState && this.otherCategoryState) {
          return this.updateFromStore.category;
        }
        else{
            return this.otherCategory;
        }
      },
      set (val) {
        if (this.updateFromStore.updateState && this.otherCategoryState) {
          this.updateFromStore.category = val
        }
        //ELSE kısmı ilk todo EKLEME olduğunda çalışacak.
        else{
          //other catecoty seçilirse.
            this.otherCategory = val;
        }
      }
    },
      
    }
  };
</script>

<style scoped>
@import "../css/styleRegisterTodo.css";
</style>
