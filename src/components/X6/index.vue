<template>
  <div class="graph-container">
    <!-- 工具栏 -->
    <div class="toolbar-container">
      <Toolbar />
    </div>
    <TeleportContainer />
    <div class="layout">
      <!-- 组件栏 -->
      <div class="node-bar-container">
        <NodesBar :nodes="nodes"></NodesBar>
      </div>
      <!-- 图形容器 -->
      <div id="container" class="graph-main-container" />
      <!-- 可操作区 -->
      <div class="panel-area-container">
        <PanelArea :detail="data.detail"> </PanelArea>
      </div>
    </div>
  </div>
</template>

<script setup>
// import registerTools from "./tools/registerTools.js";
// import registerNode from "./shape/registerNode";
import { initGraph } from "./common/graph";
import NodesBar from "./components/NodesBar.vue";
import PanelArea from "./components/PanelArea.vue";
import Toolbar from "./components/Toolbar/index.vue";
import { nodes } from "./common/nodesBar";
import { Config, CustomEventTypeEnum } from "./common/enums.js";
import { Channel } from "./common/transmit.js";
import { defineComponent, onMounted, reactive } from "vue";
import { getTeleport } from "@antv/x6-vue-shape";

const TeleportContainer = getTeleport();
const data = reactive({
  nodes,
  detail: null
});

const emit = defineEmits(["node-click", "node-dblclick"]);

// 监听
// emit 节点单击
Channel.eventListener(CustomEventTypeEnum.NODE_CLICK, (detail) =>
  {
    data.detail = detail
    emit("node-click", detail)
  }
);
// emit 节点双击
Channel.eventListener(CustomEventTypeEnum.DOUBLE_NODE_CLICK, (detail) =>
  emit("node-dblclick", detail)
);

onMounted(() => {
  // 注册节点
  // registerNode();
  // 注册工具
//   registerTools();
  // 实例化x6
  initGraph();
});
</script>

<style lang="scss">
.graph-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  .toolbar-container {
    position: absolute;
    width: 100%;
    z-index: 999;
    height: 30px;
    background-color: #fff;
  }
}
.layout {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 0 10px 10px 10px;
  margin-top: 30px;
  position: relative;

  .graph-main-container {
    width: 100%;
    height: 100%;
    flex: 1;
  }

  .node-bar-container {
    z-index: 2;
  }
  .panel-area-container {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

.x6-node {
  [magnet="true"] {
    cursor: crosshair;
    transition: none;

    &[port-group="in"] {
      cursor: move;
    }
  }

  .x6-port-body {
    visibility: hidden;
  }
}

// 选中后样式加粗标识
.begin-node-selected {
  ellipse {
    fill: #7aa4f7;
    stroke-width: 2;
  }
}

.condition-node-selected {
  rect {
    fill: #7aa4f7;
    stroke-width: 2;
  }
}

.tail-node-selected {
  rect {
    fill: #7aa4f7;
    stroke-width: 2;
  }
}

// 连接点交互
circle[data-class="choice-point"]:hover {
  transition: all 0.05s;
  r: 9;
}
</style>
