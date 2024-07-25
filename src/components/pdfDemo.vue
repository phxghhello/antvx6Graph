<template>
  <div id="demo"></div>
</template>

<script setup>
import Pdfh5 from "pdfh5";
import { onMounted } from "vue";

onMounted(() => {
  new Pdfh5("#demo", {
    // pdfurl: "https://www.gjtool.cn/pdfh5/git.pdf",
    pdfurl: "./computer.pdf",
  });
});
</script>

<style>
@import "pdfh5/css/pdfh5.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#demo {
  width: 100%;
  height: 100%;
}

* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
