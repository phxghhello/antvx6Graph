
export default (graph) => {
    graph.on('node:change:data', ({ node }) => {
        const edges = graph.getIncomingEdges(node)
        const { status } = node.getData()
        edges?.forEach((edge) => {
            if (status === 'running') {
                edge.attr('line/strokeDasharray', 5)
                edge.attr('line/style/animation', 'running-line 30s infinite linear')
            } else {
                edge.attr('line/strokeDasharray', '')
                edge.attr('line/style/animation', '')
            }
        })
    })
}