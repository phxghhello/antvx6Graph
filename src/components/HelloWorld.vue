<script setup>
import IconEpPlus from '~icons/ep/Plus'
import IconEpLollipop from '~icons/ep/Lollipop'

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <icon-ep-add-location />
  <icon-ep-check />
  <IconEpPlus />
  <component :is="IconEpPlus"></component>
  <el-icon :size="20" color="#f00">
    <IconEpEdit />
  </el-icon>
  <component :is="IconEpLollipop"></component>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
