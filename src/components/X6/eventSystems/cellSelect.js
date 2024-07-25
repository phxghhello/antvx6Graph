import { Channel } from "../common/transmit";
import { CustomEventTypeEnum, SelectStateEnum, ToolTypeEnum } from "../common/enums";

export default (graph) => {

  graph.on('cell:selected', ({ cell }) => {

    if (cell.isEdge()) {
      cell.attr('line', { stroke: 'skyblue', strokeWidth: 3 });
    }

    if (cell.isNode()) {
      const cellView = graph.findView(cell);
      cellView.addClass(`${cell.shape}-selected`);
    }
    Channel.dispatchEvent(CustomEventTypeEnum.CELL_CLICK, SelectStateEnum.SELECTED)

    // 多单选选中时，移除删除
    const cells = graph.getSelectedCells();
    if (cells.length > 1) {
      cells.forEach(currentCell => {
        currentCell.removeTools()
      });

      Channel.dispatchEvent(CustomEventTypeEnum.NODE_CLICK, null)
    } else {
      // x6默认提供 button-remove
      cell.addTools({
        name: 'button-remove', // 工具名称
        args: {
          x: 0,
          y: 0,
          offset: { x: -10, y: 5 },
        } // 工具对应的参数
      });
    }
  });

  graph.on('cell:unselected', ({ cell }) => {
    if (cell.isEdge()) {
      cell.attr('line', { stroke: '#7c68fc', strokeWidth: 2 });
    } else {
      const cellView = graph.findView(cell);
      cellView && cellView.removeClass(`${cell.shape}-selected`);
    }
    cell.removeTools()

    Channel.dispatchEvent(CustomEventTypeEnum.NODE_CLICK, null)

    Channel.dispatchEvent(CustomEventTypeEnum.CELL_CLICK, SelectStateEnum.UN_SELECTED)
    // 取消 tooltip
    graph.getNodes()?.forEach(node => {
      if (node.shape === 'html') graph.removeNode(node)
    })
  });
}
