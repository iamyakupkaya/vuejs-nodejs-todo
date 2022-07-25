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


@import "../css/stylePreLoader.css";


</style>
