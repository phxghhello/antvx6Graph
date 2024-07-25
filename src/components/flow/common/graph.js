import { Graph } from "@antv/x6";
import { useProvideGraph } from "../hooks";
import registerGraphListener from "../events";
import registerNodeEdge from '../cell-register'

/**
 * x6实例化
 */

export function initGraph() {
    const graph = new Graph({
        container: document.getElementById("container"),
        autoResize: true,
        panning: false,
        interacting: false,
        connecting: {
            createEdge() {
                return graph.createEdge({
                    shape: 'dag-edge',
                    attrs: {
                        line: {
                            strokeDasharray: '5 5',
                        },
                    },
                    zIndex: -1,
                })
            },
        },
    })

    // 注册画布监听器
    registerGraphListener(graph);

    registerNodeEdge();

    // 缓存实例化graph引用
    useProvideGraph(graph)

    return graph
}