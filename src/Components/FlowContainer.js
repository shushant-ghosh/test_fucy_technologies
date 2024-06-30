import React, { useCallback, useContext } from 'react'
import { flowContext } from './Context.js/FlowContext'
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

function FlowContainer() {
    const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } = useContext(flowContext)
    console.log({ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange })

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}

export default FlowContainer
