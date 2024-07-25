import { Graph } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import AlgoNode from '../components/AlgoNode.vue'

export default () => {
    register({
        shape: 'dag-node',
        width: 180,
        height: 36,
        component: AlgoNode,
        ports: {
            groups: {
                top: {
                    position: 'top',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#C2C8D5',
                            strokeWidth: 1,
                            fill: '#fff',
                        },
                    },
                },
                bottom: {
                    position: 'bottom',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#C2C8D5',
                            strokeWidth: 1,
                            fill: '#fff',
                        },
                    },
                },
            },
        },
    })

    Graph.registerEdge(
        'dag-edge',
        {
            inherit: 'edge',
            attrs: {
                line: {
                    stroke: '#C2C8D5',
                    strokeWidth: 1
                },
            },
        },
        true,
    )
}