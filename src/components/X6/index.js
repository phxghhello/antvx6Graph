import index from "./index.vue";

index.install = function (Vue) {
  Vue.component(index.name, index);
};

export default index;
