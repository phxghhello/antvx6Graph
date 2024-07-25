<template>
  <div class="flow-container">
    <!-- 图形容器 -->
    <div id="container" class="graph-main-container"></div>
    <TeleportContainer />
  </div>
</template>

<script setup>
import { onMounted, nextTick } from "vue";
import { initGraph } from "./common/graph";
import { useGraph } from "./hooks";
import { celldata, nodeStatusList } from './data'

import { Channel } from "components/X6/common/transmit";
import { CustomEventTypeEnum } from "components/X6/common/enums";

import { getTeleport } from '@antv/x6-vue-shape'
const TeleportContainer = getTeleport()

const graph = useGraph();

const init = (celldata = []) => {
  const cells = [];
  celldata.forEach((item) => {
    if (item.shape === "dag-node") {
      cells.push(graph.value.createNode(item));
    } else {
      cells.push(graph.value.createEdge(item));
    }
  });
  graph.value.resetCells(cells);
};

const showNodeStatus = async (statusList = []) => {
  const status = statusList.shift()
  status?.forEach((item) => {
    const { id, status } = item
    const node = graph.value.getCellById(id)
    const data = node.getData()
    node.setData({
      ...data,
      status,
    })
  })
  setTimeout(() => {
    showNodeStatus(statusList)
  }, 300)
}

onMounted(async () => {
  initGraph();

  await nextTick();

  init(celldata);

  showNodeStatus(nodeStatusList);

  graph.value.centerContent()
});

Channel.eventListener(CustomEventTypeEnum.NODE_CLICK, (detail) =>
  {
    console.log('点击', detail);
  }
);
</script>

<style lang="scss">
.flow-container {
  width: 100%;
  height: 100%;
  .graph-main-container {
    width: 100%;
    height: 100%;
  }
}
</style>
