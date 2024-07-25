import nodeClick from "./nodeClick";
import edgeConnected from "./edge-connected";
import nodeChangeData from "./node-change-data";

// 统一注册 事件系统
export default function (graph) {
    nodeClick(graph)
    edgeConnected(graph)
    nodeChangeData(graph)
}