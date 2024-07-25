<template>
  <div class="panel-area-container">
    {{ detail }}
  </div>
</template>

<script setup>
const props = defineProps({
  detail: Object
})
</script>
<style lang="scss" scoped>
.panel-area-container {
  padding: 5px;
  min-width: 300px;
  background: #f6f6f6;
}
</style>
