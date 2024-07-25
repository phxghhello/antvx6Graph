
import { register } from "@antv/x6-vue-shape";

import VueNode from "./VueNode.vue";

export default () => {
  register({
    shape: 'vue-node',
    width: 200,
    height: 50,
    component: VueNode,
  })
}
