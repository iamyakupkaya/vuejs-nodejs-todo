<template>
  <div class="todo-app">
    <h1>To Do</h1>
    <hr class="todo-app__hr" />
    <div>
      <input
        class="todo-app__input"
        :placeholder="
          language == 'turkish' ? 'Yapılacak konu başlığı' : 'Title of todo'
        "
      />
      <br />
      <br />
      <textarea
        rows="4"
        class="todo-app__textarea todo-app__input"
        :placeholder="
          language == 'turkish' ? 'Ne yapacaksın?' : 'What will you do?'
        "
      />
    </div>

    <div>{{ language == "turkish" ? "Kategori" : "Category" }}:</div>

    <select v-model="selected">
      <option disabled value="">
        {{
          language == "turkish" ? "Lütfen birini seçiniz" : "Please select one"
        }}
      </option>
      <option v-for="i in categoryTR.length" :key="i">
        {{ language == "turkish" ? categoryTR[i - 1] : categoryEN[i - 1] }}
      </option>
    </select>
    <div
      v-if="
        selected.toLowerCase() == 'other' || selected.toLowerCase() == 'diğer'
      "
    >
      <br />
      <input
        class="todo-app__input"
        :placeholder="
          language == 'turkish'
            ? 'Lütfen kategori başlığı giriniz'
            : 'Please enter the category title'
        "
      />
    </div>

    <h4>
      {{ language == "turkish" ? "Ne kadar önemli?" : "Is it important?" }}
    </h4>
    <div :style="{ display: 'flex' }" class="todo-app__degree-container">
      <label :style="{ 'background-color': 'rgba(255, 0, 0, 0.5)' }">
        <input type="radio" name="light" checked />
        <span>{{ language == "turkish" ? "YÜKSEK" : "HIGH" }}</span>
        <font-awesome-icon icon="fa-solid fa-angles-up" />
      </label>
      <label :style="{ 'background-color': 'rgba(255, 205, 0, 0.5)' }">
        <input type="radio" name="light" checked />
        <span>{{ language == "turkish" ? "ORTA" : "MEDIUM" }}</span>
        <font-awesome-icon
          icon="fa-solid fa-down-left-and-up-right-to-center"
        />
      </label>
      <label :style="{ 'background-color': 'rgba(16, 193, 2, 0.5)' }">
        <input type="radio" name="light" checked />
        <span>{{ language == "turkish" ? "DÜŞÜK" : "LOW" }}</span>
        <font-awesome-icon icon="fa-solid fa-angles-down" />
      </label>
    </div>
    <br />
    <button class="todo-app__submit-button" type="submit">
      <span>{{ language == "turkish" ? "EKLE" : "ADD" }}</span>
      <font-awesome-icon icon="fa-solid fa-plus" size="xl" />
    </button>
  </div>
  <hr class="todo-app__hr" />
  <hr class="todo-app__hr" />

  <button class="todo-app__show-list">
    {{
      language == "turkish"
        ? "YAPILACAKLAR LİSTESİNİ GÖSTER"
        : "SHOW MY TO DO LIST"
    }}
  </button>
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
    };
  },
  props: ["language"],
};
</script>

<style scoped>
.todo-app {
  width: 50%;
  min-width: 750px;
  margin: 0 auto;
  border-radius: 50px;
  box-shadow: inset 13px 13px 24px #797979, inset -13px -13px 24px #ffffff;
}
.todo-app__input {
  width: 75%;
  height: 2.5rem;
  background-color: #e0e0e0;
  border-radius: 20px;
  border-width: 2px;
  border-color: black;
  color: black;
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
  margin-bottom: 25px;
}
.todo-app__submit-button span {
  margin: 15px;
}

.todo-app__hr {
  border: 1px solid red;
  margin-bottom: 1rem;
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
</style>
