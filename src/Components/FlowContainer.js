import React, { useCallback, useContext, useState } from 'react'
import { flowContext } from './Context.js/FlowContext'
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    addEdge,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
} from 'reactflow';

import 'reactflow/dist/style.css';

function FlowContainer() {
    const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } = useContext(flowContext)
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [selectedEdges, setSelectedEdges] = useState([]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    const onChange = useCallback(({ nodes, edges }) => {
        console.log({ nodes, edges })
        setSelectedNodes(nodes.map((node) => node.id));
        setSelectedEdges(edges.map((edge) => edge.id));
    }, [])
    const onNodesDelete = useCallback(
        (deleted) => {
            setEdges(
                deleted.reduce((acc, node) => {
                    const incomers = getIncomers(node, nodes, edges);
                    const outgoers = getOutgoers(node, nodes, edges);
                    const connectedEdges = getConnectedEdges([node], edges);

                    const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

                    const createdEdges = incomers.flatMap(({ id: source }) =>
                        outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
                    );

                    return [...remainingEdges, ...createdEdges];
                }, edges)
            );
        },
        [nodes, edges]
    );
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onChange={onChange}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodesDelete={onNodesDelete}
            >
                <Controls />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}

export default FlowContainer
