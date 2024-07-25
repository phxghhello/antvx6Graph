import { Graph } from "@antv/x6";
// import registerNode from "../shape/registerNode";
import registerGraphListener from "../eventSystems";
// import trigger from "../common/trigger";
import { useProvideGraph } from "../store";

import { Snapline } from '@antv/x6-plugin-snapline'
import { History } from "@antv/x6-plugin-history"
import { Selection } from '@antv/x6-plugin-selection'
import { Clipboard } from "@antv/x6-plugin-clipboard"

/**
 * x6实例化
 */
export function initGraph() {
    const graph = new Graph({
        container: document.getElementById("container"),
        // width: 600,
        // height: 600,
        // 监听容器大小改变，并自动更新画布大小
        autoResize: true,
        // 画布平移
        panning: {
            enabled: true,
            eventTypes: ["leftMouseDown", "rightMouseDown", "mouseWheel"],
        },
        // 网格
        // grid: {
        //     size: 10, // 网格大小 10px
        //     visible: true, // 渲染网格背景
        // },
        background: {
            color: '#F2F7FA',
        },
        // 定制节点和边的交互行为
        interacting: function (cellView) {
            if (cellView.cell.getData()?.disableMove) {
                return { nodeMovable: false }
            }
            return true
        },
        // 配置全局的连线规则
        // https://x6.antv.vision/zh/docs/api/graph/interaction
        connecting: {
            // 自动吸附
            snap: true,
            // 不允许连接到画布空白位置的点
            allowBlank: false,
            // 不允许创建循环连线
            allowLoop: false,
            // 不允许在相同的起始节点和终止之间创建多条边
            allowMulti: false,
            // 高亮显示所有可用的连接桩或节点
            // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#highlight
            highlight: true,
            // 当连接到节点时，通过 sourceAnchor 来指定源节点的锚点。
            sourceAnchor: {
                name: "center",
            },
            // 当连接到节点时，通过 targetAnchor 来指定目标节点的锚点。
            targetAnchor: "center",
            // 指定连接点，默认值为 boundary。
            connectionPoint: "anchor",
            // 连接器将起点、路由返回的点、终点加工为 元素的 d 属性，决定了边渲染到画布后的样式，默认值为 normal。
            connector: {
                name: "rounded",
                args: {
                    radius: 20,
                },
            },
            // // 路由将边的路径点 vertices 做进一步转换处理，并在必要时添加额外的点，然后返回处理后的点，默认值为 normal。
            router: "manhattan",
            // // https://x6.antv.vision/zh/docs/tutorial/basic/interacting/#validatemagnet
            // // 判断是否新增边
            validateMagnet({ magnet }) {
                const portGroup = magnet.getAttribute("port-group");
                return portGroup !== "in";
            },
            // // 连接的过程中创建新的边
            createEdge() {
                return this.createEdge({
                    zIndex: -1,
                    attrs: {
                        line: {
                            strokeDasharray: "5 5",
                            stroke: "#7c68fc",
                            strokeWidth: 2,
                            targetMarker: {
                                name: "block",
                                args: {
                                    size: "6",
                                },
                            },
                        },
                    },
                });
            },
            // // 在移动边的时候判断连接是否有效，如果返回 false，当鼠标放开的时候，不会连接到当前元素，否则会连接到当前元素。
            validateConnection({ targetView, sourceMagnet, targetMagnet, sourceCell }) {
                if (!sourceMagnet || !targetMagnet) {
                    return false;
                }
                if (sourceCell.getData()?.disableMove) return false
                // 判断目标链接桩是否可连接
                const portId = targetMagnet.getAttribute("port");
                const node = targetView.cell;
                const port = node.getPort(portId);
                if (!port) {
                    return false;
                }
                return true;
            },
        },
    });

    // 注册Vue节点
    // registerNode()
    // 注册画布监听器
    registerGraphListener(graph)
    // 注入触发器
    // trigger(graph);

    // 插件

    graph.use(
        new Snapline({
            enabled: true,
        }),
    )
    graph.use(
        new History({
            enabled: true,
        }),
    )
    graph.use(
        new Selection({
            enabled: true,
            showNodeSelectionBox: true,
        }),
    )
    graph.use(new Clipboard({ enabled: true }))

    // 缓存实例化graph引用
    useProvideGraph(graph)
    return graph
}