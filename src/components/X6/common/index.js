import { ActionType, CustomEventTypeEnum } from "./enums";
import ErrorClass from "./errorClass";
import { fromJSON, toJSON } from "./transform";
import { Channel } from "./transmit";
import { freezeGraph, unfreezeGraph } from "./trigger";
import { useGraph } from "../store";

/**json格式化 */
export function fmtJSON(target) {
    try {
        if (typeof target == 'string') return JSON.parse(target)
        if (Array.isArray(target)) return target.map((item) => {
            if (typeof item == 'object') return item
            return JSON.parse(item)
        })
        else if (typeof target == 'object') return target
        else {
            Channel.dispatchEvent(CustomEventTypeEnum.RUNTIME_ERR, ErrorClass.InvalidFormatData('nodes or edges error'))
            throw ErrorClass.InvalidFormatData('nodes or edges error')
        }
    } catch (error) {
        return {}
    }
}

/**文字溢出格式化 */
export function fmtLabelOverflow(label) {
    if (typeof label != 'string') return label
    if (label.length <= 9) return label
    const cutLabel = label.slice(0, 6) + '...'
    return cutLabel
}

/**获取画布数据 */
export function getGraphJSON() {
    const graph = useGraph()
    return toJSON(graph.value)
}

/**初始化画布默认数据 */
export function setDefaultGraphData(nodes, edges) {
    const graph = useGraph()
    fromJSON(graph.value, nodes, edges)
}

/**冻结画布 */
export function disableGraph(bool) {
    const graph = useGraph()
    if (bool) freezeGraph(graph.value)
    else unfreezeGraph(graph.value)
}

/**清理画布 */
export function graphClean() {
    const graph = useGraph()
    const cells = graph.value.getCells();
    if (cells.length) {
        // 删除前移除所有包含工具
        cells.forEach(currentCell => {
            currentCell.removeTools()
        });
        graph.value.removeCells(cells);
    }
}

/**监听单元事件双击回调 */
export function nodeDclick(cb) {
    Channel.eventListener(CustomEventTypeEnum.DOUBLE_NODE_CLICK, (detail) => cb(detail));
}

/**监听单元事件单击回调 */
export function nodeClick(cb) {
    Channel.eventListener(CustomEventTypeEnum.NODE_CLICK, (detail) => cb(detail));
}

/**运行时异常回调 */
export function runtimeError(cb) {
    Channel.eventListener(CustomEventTypeEnum.RUNTIME_ERR, (err) => cb(err))
}

/**修改Node节点 */
export function updateNode(data) {
    const graph = useGraph()
    const cells = graph.value.getSelectedCells()
    if (Array.isArray(cells) && cells.length === 1) {
        const cell = cells[0]
        const { label, ...otherParams } = data
        // 设置label
        if (label) {
            const cutLabel = fmtLabelOverflow(label)
            cell.setData({
                tooltip: label,
                initialization: false
            })
            cell.setAttrs({ label: { text: cutLabel } })
        }
        for (const key in otherParams) {
            if (Object.hasOwnProperty.call(otherParams, key)) {
                const value = otherParams[key];
                if (value !== undefined && value !== null) {
                    cell.setData({
                        [key]: value,
                        initialization: false
                    })
                }
            }
        }
        // 清除选框
        graph.value.cleanSelection()
    }
}

/**
 * 图形校验
 * 判断是否有未连接的节点
 */
export function validate() {
    const graph = useGraph()

    const errs = []

    // 获取所有单元
    const cells = graph.value.getCells()
    if (!cells.length) errs.push('画布无可用节点')

    // 获取所有边
    const edges = graph.value.getEdges()
    const nodeSet = new Set(
        edges.reduce((a, v) => {
            a.push(v.target.cell)
            a.push(v.source.cell)
            return a
        }, [])
    )

    // 获取所有节点
    const nodes = graph.value.getNodes()

    // 如果通过边获取到的 所有节点数量与 node节点不匹配,则证明存在未连接的节点
    if (nodeSet.size !== nodes.length) errs.push('存在未连线的节点')

    // 校验 是否包含 触发器 和 动作
    const { TRIGGER, ACTION } = ActionType
    let startNodes = 0, endNodes = 0
    for (const node of nodes) {
        const { initialization, tooltip, actionType } = node.getData()
        // 数据未修改过
        if (initialization) errs.push(`[${tooltip || ''}]节点数据不能为空`)
        switch (actionType) {
            case TRIGGER:
                startNodes += 1
                break;
            case ACTION:
                endNodes += 1
                break;
        }
    }

    // 通过 actionType 存在数量判断
    // 往往一个闭环操作至少包含一个触发器相关的节点和 执行动作相关的节点
    if (!startNodes || !endNodes) errs.push('流程链路未闭环')

    // errs: 所有捕获异常以Array形式顺序排列, 向外暴露
    return { ok: !errs.length, errs }
}


/**获取node基础数据 */
function getBaseNodes() {
    const graph = useGraph()
    // 获取所有节点
    const nodes = graph.value.getNodes()
    return nodes.map(node => {
        const { id, data } = node
        return {
            id,
            data
        }
    })
}

/**获取edge基础数据 */
function getBaseEdges() {
    const graph = useGraph()
    // 获取所有边
    const edges = graph.value.getEdges()
    return edges.map(edge => {
        return {
            id: edge.id,
            source: edge.source.cell,
            target: edge.target.cell
        }
    })
}

/**
 * 获取所有已存在的node节点和edge边
 */
export function getAtoms(options) {
    let atoms
    // 如果是空，则获取所有
    switch (options) {
        case 'nodes':
            atoms = { nodes: getBaseNodes() }
            break;
        case 'edges':
            atoms = { edges: getBaseEdges() }
            break;
        default:
            atoms = { nodes: getBaseNodes(), edges: getBaseEdges() }
            break;
    }
    return atoms
}