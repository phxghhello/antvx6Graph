
export default (graph) => {
    graph.on('edge:connected', ({ edge }) => {
        edge.attr({
            line: {
                strokeDasharray: '',
            },
        })
    })
}