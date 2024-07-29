<template>
  <div style="padding: 10px;">
    <collapse
      v-model="activeNames"
      :collaseItems="collaseItems"
      @change="handleChange"
    >
    <template #default="{ index, item }">
        <div style="background-color: #f2f2f2;">
            <div>{{ index + 1 }}、<span>{{ item.content }}</span></div>
        </div>
    </template>
  </collapse>
  </div>
</template>

<script setup>
import Collapse from "./index.vue";
import { ref } from "vue";

const collaseItems = [
  {
    title: "标题标题1",
    name: "1",
    content: '内容内容内容1'
  },
  {
    title: "标题标题2",
    name: "2",
    content: '内容内容内容2'
  },
  {
    title: "标题标题3",
    name: "3",
    content: '内容内容内容3'
  },
];
const activeNames = ref(["1"]);

const handleChange = (val) => {
  console.log('handleChange', val);
  console.log('activeNames', activeNames);
};
</script>

<style lang="scss"></style>
