<template>
  <div class="pre-loader">
    <div class="pre-loader__counter">{{ counter }}</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: function () {
    return {
      counter: 0,
    };
  },
  props: {
    msg: String,
  },
  created() {
    //this will trigger out counter for preloader
    let interval = setInterval(() => {
      console.log(this);
      if (this.counter < 100) {
        this.counter++;
      } else {
        clearInterval(interval);
      }
    }, 1900 / 100);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/global.css";

.pre-loader {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #070707;
}

.pre-loader:before {
  content: "LOADING...";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03);
}

.pre-loader__counter {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #e0e0e0;
  font-size: 15rem;
  font-weight: 900;
  z-index: 1;
}
.pre-loader__counter:after {
  content: "%";
  font-size: 5rem;
  font-weight: 900;
}
</style>
