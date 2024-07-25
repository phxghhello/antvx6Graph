<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
// import pdfDemo from './components/pdfDemo.vue';
// import speakText from './components/speakText.vue';
// import seamless from './components/seamless.vue';
import Flow from './components/flow/index.vue'
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <div id="app">
    <Flow />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100vw;
  height: 100vh;
}
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
