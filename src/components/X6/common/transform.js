// G6转X6
import { fmtJSON, fmtLabelOverflow } from ".";
import { ActionType, CustomEventTypeEnum } from "./enums";
import ErrorClass from "./errorClass";
import { Channel } from "./transmit";

/**获取不同actionType对应主题色 */
export function getActionTypeTheme(type) {
    /**@enum */
    const Theme = {
        /**默认深蓝 */
        DEFAULT: { border: '#5b8ffa', background: '#83b7ff' },
        /**浅蓝色 */
        BLUE: { border: '#A4C2FF', background: '#D0DDF9' },
        /**绿色 */
        GREEN: { border: '#A8D7CD', background: '#BFE8E2' },
        /**橘色 */
        ORANGE: { border: '#FDBE94', background: '#FBECE3' },
        /**灰色 */
        GRAY: { border: '#C4C4C4', background: '#E4E4E4' },
        /**黄色 */
        YELLOW: { border: '#CCAC55', background: '#FDF3D7' },
    }
    // 默认主题色
    const DEFAULE_THEME = Theme.DEFAULT
    if (!type) return DEFAULE_THEME
    const { TRIGGER, CONDITION, ACTION } = ActionType
    return {
        // 触发器
        [TRIGGER]: Theme.GREEN,
        // 状态条件
        [CONDITION]: Theme.GRAY,
        // 执行动作
        [ACTION]: Theme.BLUE,
    }[type]
}

/**
 * 获取默认配置选项
 * 兼容x6/g6
 */
function getBaseConfig(node) {
    let { type, shape, tooltip, attrs, x, y, size, id, position, data, actionType, initialization } = node
    let _width,
        _height,
        _x = x,
        _y = y,
        _shape = shape,
        _tooltip = tooltip,
        _actionType = actionType
    if (data && data.actionType) {
        _actionType = data.actionType
    }
    if (size) {
        // G6
        if (Array.isArray(size)) {
            _width = size[0]
            _height = size[1]
        }
        // x6
        else if (typeof size == 'object') {
            _width = size.width
            _height = size.height
        }
    }
    if (typeof position == 'object') {
        _x = position.x
        _y = position.y
    }
    // 形状转义
    // G6
    if (typeof type == 'string') {
        _shape = type
        if (type === 'diamond') _shape = 'rect'
    }
    if (typeof attrs == 'object') {
        _tooltip = attrs.label.text
    }

    const cutLabel = fmtLabelOverflow(_tooltip)

    return {
        type: _shape,
        label: cutLabel,
        x: _x,
        y: _y,
        width: _width,
        height: _height,
        id,
        actionType: _actionType,
        data: {
            actionType: _actionType,
            initialization,
            tooltip: _tooltip
        }
    }
}

/**
 * 获取多边形node节点
 */
export function getEllipseNode(node) {
    const { type, label, x, y, width, height, id, actionType, data } = getBaseConfig(node)
    // 主题色
    const targetTheme = getActionTypeTheme(actionType)
    return {
        id,
        shape: type, // 指定使用何种图形，默认值为 'rect'
        width,
        height,
        x,
        y,
        zIndex: 100,
        data,
        attrs: {
            label: {
                text: label,
                fill: "#7D7671",
                strokeWidth: 0.4,
                fontSize: 12,
            },
            body: {
                stroke: targetTheme.border,
                strokeWidth: 1.5,
                fill: targetTheme.background,
            }
        },
        ports: {
            items: [
                { group: 'port_g', id: 'p_bottom' },
            ],
            groups: {
                port_g: {
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff'
                        },
                    },
                    position: 'bottom'
                }
            }
        },
    }
}

/**
 * 获取矩形node节点
 */
export function getRectNode(node) {
    const { type, label, x, y, width, height, id, actionType, data } = getBaseConfig(node)
    // 主题色
    const targetTheme = getActionTypeTheme(actionType)
    return {
        id,
        shape: type, // 指定使用何种图形，默认值为 'rect'
        width,
        height,
        x,
        y,
        zIndex: 100,
        markup: [
            {
                tagName: 'rect',
                selector: 'body',
            },
            {
                tagName: 'text',
                selector: 'label',
            }
        ],
        data,
        attrs: {
            label: {
                text: label,
                fill: "#7D7671",
                strokeWidth: 0.4,
                fontSize: 12,
            },
            body: {
                stroke: targetTheme.border,
                strokeWidth: 1.5,
                fill: targetTheme.background,
                rx: 6,
                ry: 6,
            }
        },
        ports: {
            items: [
                { group: 'port-top', id: 'p_top' },
                { group: 'port-bottom', id: 'p_bottom' },
                { group: 'port-left', id: 'p_left' },
                { group: 'port-right', id: 'p_right' },
            ],
            groups: {
                "port-top": {
                    position: 'top',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff'
                        }
                    }
                },
                "port-bottom": {
                    position: 'bottom',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff'
                        }
                    }
                },
                "port-left": {
                    position: 'left',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff'
                        }
                    }
                },
                "port-right": {
                    position: 'right',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff'
                        }
                    }
                }
            }
        },
    }
}

/**
 * 获取菱形node节点
 */
export function getDiamondNode(node) {
    const { type, label, x, y, id, actionType, data } = getBaseConfig(node)
    // 主题色
    const targetTheme = getActionTypeTheme(actionType)
    return {
        id,
        shape: type, // 指定使用何种图形，默认值为 'rect'
        width: 50,
        height: 50,
        x,
        y,
        zIndex: 100,
        markup: [
            {
                tagName: 'rect',
                selector: 'body'
            },
            {
                tagName: 'text',
                selector: 'label',
            }
        ],
        data,
        attrs: {
            label: {
                text: label,
                fill: "#7D7671",
                strokeWidth: 0.4,
                fontSize: 12,
            },
            body: {
                transform: "rotate(-45,25,25)",
                stroke: targetTheme.border,
                strokeWidth: 1.5,
                fill: targetTheme.background,
                rx: 5, // 属性用于定义水平轴向的圆角半径尺寸。
                ry: 5,
            }
        },
        ports: {
            items: [
                { group: 'in', id: 'p_top' },
                { group: 'out', id: 'p_bottom' },
            ],
            groups: {
                in: {
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff',
                            // 上平移
                            transform: 'translate(0, -7)'
                        }
                    },
                    position: 'top'
                },
                out: {
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff',
                            // 下平移
                            transform: 'translate(0, 7)'
                        }
                    },
                    position: 'bottom'
                }
            }
        },
    }
}

// 获取Vue节点
export function getVueNode(node) {
    const { label, width, height, id, data } = getBaseConfig(node)
    return {
        id,
        shape: "vue-shape",
        width,
        height,
        component: "vue-node",
        label,
        zIndex: 100,
        data,
        ports: {
            items: [
                { group: 'port-top', id: 'p_top' },
                { group: 'port-bottom', id: 'p_bottom' },
            ],
            groups: {
                "port-top": {
                    position: 'top',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff'
                        }
                    }
                },
                "port-bottom": {
                    position: 'bottom',
                    zIndex: 20,
                    attrs: {
                        circle: {
                            dataClass: 'choice-point',
                            r: 6,
                            magnet: true,
                            stroke: '#5b8ffa',
                            strokeWidth: 1,
                            fill: '#fff'
                        }
                    }
                }
            }
        },
    }
}

function getNodeJSON(nodes) {
    const nodeList = []
    for (const node of nodes) {
        const nodeJSON = fmtJSON(node)
        // 兼容G6
        const {
            TRIGGER,
            CONDITION,
            ACTION,
        } = ActionType;
        const actionType = nodeJSON.data.actionType
        if (!actionType) {
            Channel.dispatchEvent(CustomEventTypeEnum.RUNTIME_ERR, ErrorClass.InvalidFormatData('缺少ActionType'))
            throw new ErrorClass.InvalidFormatData('缺少ActionType')
        }
        switch (actionType) {
            // 触发器
            case TRIGGER:
                nodeList.push(getEllipseNode(nodeJSON))
                break;
            // 状态条件
            case CONDITION:
                nodeList.push(getDiamondNode(nodeJSON))
                break;
            // 执行动作
            case ACTION:
                nodeList.push(getRectNode(nodeJSON))
                break;
            default:
                break;
        }
    }
    return nodeList
}

/**
 * 反序列化
 * 按照指定的 JSON 数据渲染节点和边。
 */
export function fromJSON(graph, nodes, edges) {
    if (!Array.isArray(nodes) || !Array.isArray(edges)) {
        Channel.dispatchEvent(CustomEventTypeEnum.RUNTIME_ERR, ErrorClass.InvalidParameters('节点或者边数据格式不正确'))
        throw new ErrorClass.InvalidParameters('节点或者边数据格式不正确')
    }
    graph.fromJSON({
        nodes: getNodeJSON(nodes),
        edges: fmtJSON(edges)
    });
}

/**
 * 序列化
 */
export function toJSON(graph) {
    const edges = [], nodes = [], edgesJSON = [], nodesJSON = []
    const cells = graph.getCells()
    if (cells.length) {
        for (const cell of cells) {
            const json = cell.toJSON()
            if (cell.isEdge()) {
                edgesJSON.push(json)
                edges.push(JSON.stringify(json))
            }
            if (cell.isNode()) {
                // 把省略符号去掉
                json.attrs.label.text = json.data.tooltip
                nodesJSON.push(json)
                nodes.push(JSON.stringify(json))
            }
        }
    }
    return { nodes, edges, nodesJSON, edgesJSON }
}