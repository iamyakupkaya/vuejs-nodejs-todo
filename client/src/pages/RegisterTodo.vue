<template>
  <div class="todo-app">
    <h1 class="todo-app_title">To Do</h1>
    <hr class="todo-app__hr" />
    <div class="todo-app__select-file">
     <div class="todo-app__select">
       <span :style="{'margin-right':'10px', 'font-weight':'bold', 'margin-bottom':'10px'}">{{ language == "turkish" ? "Kategori" : "Category" }}:</span>

    <select v-model="selected" v-bind:Category="(selected.toLowerCase() == 'other') || (selected.toLowerCase() == 'diğer') ? todoInfo.category=otherCategory : todoInfo.category=selected ">
      <option disabled value="">
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
        selected.toLowerCase() == 'other' || selected.toLowerCase() == 'diğer'
      "
    >
      <br />
      <input
      v-model="otherCategory"
        class="todo-app__input"
        :placeholder="
          language == 'turkish'
            ? 'Lütfen kategori başlığı giriniz'
            : 'Please enter the category title'
        "
      />
    </div>
      <br />
    <div>
      <input
        v-model="todoInfo.title"
        class="todo-app__input"
        :placeholder="
          language == 'turkish' ? 'Yapılacak konu başlığı' : 'Title of todo'
        "
      />
      <br />
      <br />
      <textarea
        v-model="todoInfo.content"

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
        <input v-model="todoInfo.degree" type="radio" name="light"   value="high"/>
        <span>{{ language == "turkish" ? "YÜKSEK" : "HIGH" }}</span>
        <font-awesome-icon icon="fa-solid fa-angles-up" />
      </label>
      <label :style="{ 'background-color': 'rgba(255, 205, 0, 1)' }">
        <input v-model="todoInfo.degree" type="radio" name="light"  value="medium" />
        <span>{{ language == "turkish" ? "ORTA" : "MEDIUM" }}</span>
        <font-awesome-icon
          icon="fa-solid fa-down-left-and-up-right-to-center"
        />
      </label>
      <label :style="{ 'background-color': 'rgba(16, 193, 2, 1)' }">
        <input v-model="todoInfo.degree" type="radio" name="light" value="low" checked />
        <span>{{ language == "turkish" ? "DÜŞÜK" : "LOW" }}</span>
        <font-awesome-icon icon="fa-solid fa-angles-down" />
      </label>
    </div>
    <br />
    <button @click="sendTodoInfo" class="todo-app__submit-button" type="submit">
      <span>{{ language == "turkish" ? "EKLE" : "ADD" }}</span>
      <font-awesome-icon icon="fa-solid fa-plus" size="xl" />
    </button>
  <h6 style="padding-bottom:10px; color:red; font-weight:bold;">{{language == "turkish" ? "**:Tamamen opsiyonel / İsteğe bağlı" : "**: Totally optional / if you want to upload"}}</h6>

  </div>
  <hr class="todo-app__hr" />
  <hr class="todo-app__hr" />
 
 </template>

<script>


export default {
  data: function () {
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
      todoInfo:{
        title:"",
        content:"",
        category:"",
        degree:"",
        image:""
      },
    };
  },
  props: ["language"],
  emits: ['saveTodoInfo'],
  methods:{
    onChange(e){
      console.log("files", e.target.files)
      const file = e.target.files[0];
      console.log("My file:", file)
      if(file){
        this.todoInfo.image = URL.createObjectURL(file);
        this.$refs.IMGfile.value = null;


      }
      console.log(this.todoInfo)
    },
    sendTodoInfo(){
      console.log("bia an yuh dedim")
      this.$emit('saveTodoInfo',this.todoInfo)
      console.log(this.todoInfo.image)
      console.log("Gönderildi bile.")
      this.todoInfo.title="";
      this.todoInfo.content = "";
      this.todoInfo.category="";
      this.todoInfo.image="";
      this.otherCategory=""
      this.selected= "";
      this.degree=""
    }
    
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Splash&display=swap');
.todo-app_title{
font-family: 'Splash', cursive;
font-weight:900;

}
.todo-app {
  width: 50%;
  min-width: 750px;
  margin: 0 auto;
  border-radius: 50px;
 
  background: #E0E0E0;
box-shadow: inset 8px 8px 11px #6e6e6e,
            inset -8px -8px 11px #ffffff;
            background: linear-gradient(90deg, rgba(224,222,222,0.5) 0%, rgba(182,246,238,0.5802696078431373) 50%, rgba(224,222,222,0.5) 100%);
}
.todo-app__input {
  width: 75%;
  height: 2.5rem;
  background-color: #e0e0e0;
  border-radius: 20px;
  border-width: 2px;
  border-color: black;
  color: black;
  font-weight: 600;
background: rgb(135,135,135);
background: linear-gradient(90deg, rgba(224,222,222,0.5) 0%, rgba(182,246,238,0.5802696078431373) 50%, rgba(224,222,222,0.5) 100%);
}

.todo-app__textarea {
  resize: vertical;
  min-height: 100px;
  max-height: 300px;
  
}
.todo-app__degree-container label {
  border-radius: 50px;
  text-align: center;
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  margin: 10px auto;
  cursor: pointer;
  position: relative;
  font-weight: 600;
  color: black;
}
.todo-app__degree-container label:first-child{
  margin-left:125px;
}
.todo-app__degree-container label:last-child{
  margin-right:125px;
}
.todo-app__degree-container input {
  width: 20px;
  height: 20px;

  margin: auto 5px;
}
.todo-app__degree-container span {
  margin-right: 15px;
}

.todo-app__submit-button {
  width: 50%;
  font-weight: 900;
  height: 50px;
  border-radius: 25px;
  background-color: rgba(0, 17, 255, 0.5);
  color: black;
  margin-bottom: 10px;
}
.todo-app__submit-button span {
  margin: 15px;
}

.todo-app__hr {
  border: 1px solid red;
  margin-bottom: 1rem;
}
.todo-app__file-button{
  width: 250px;
  height:50px;
  border: 1px solid red;
  border-radius:20px;
  background-color:#C74545;
  color:black;
  font-weight:800;
  margin-bottom:15px;

}

select{
  width: 250px;
  margin: 0 auto;
  border:2px solid black;
  border-radius: 50px;
  color:black;
  font-weight: 600;
background: linear-gradient(90deg, rgba(224,222,222,0.5) 0%, rgba(182,246,238,0.5802696078431373) 100%);
}

.todo-app__select-file{
  display:flex;
  justify-content: space-evenly;
  align-items: baseline;
}
.todo-app__select{  
  padding-bottom: 25px;

}



</style>
