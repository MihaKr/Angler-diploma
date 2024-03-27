// components/DataDisplayer.tsx

import React, {useEffect, useMemo, useState} from 'react';
import ReactFlow, {Edge, ReactFlowProvider, Node, Background, useStoreApi, Position, MiniMap} from "reactflow";
import Flow from "@/app/components/Flow";
import ContNode from "@/app/components/ContNode";
import {node, number} from "prop-types";
import PipelineContainer from "@/app/components/PipelineContainer";
import {nice} from "d3-array";
import contNode from "@/app/components/ContNode";
import {DragEndEvent} from "@dnd-kit/core";
import dataPut from "@/app/components/dataPut";
import {set} from "yaml/dist/schema/yaml-1.1/set";
import {Coordinates} from "@dnd-kit/utilities";
import {describe} from "node:test";

interface AllContainersI {
    app_container_id: number;
    container_id: number;
    app_id: number;
    prev_container: number;
    next_container: number;
    position: { x: number, y: number }
}

interface edge {
    link_id: number,
    app_id_link: number
    origin: number
    origin_edge: string
    destination: number
    destination_edge: string
}

interface DisplayPipelineProps {
    data: any;
    updateData: React.Dispatch<React.SetStateAction<any>>;
    edge_data: any
    update_edge: React.Dispatch<React.SetStateAction<any>>;
    app_id: number
}

const nodeSize = {
    width: 100,
    height: 40,
};


const DisplayPipeline: React.FC<DisplayPipelineProps> = ({ data, updateData, edge_data, update_edge, app_id }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        console.log(nodes)
        setNodes(
            data.map((data: AllContainersI, index: number) => ({
                id: `node-${ data.app_container_id}`,
                type: 'ContNode',
                position: { x: data.position.x, y: data.position.y },
                data: data,
            }))
        );
    }, [data]);

    useEffect(() => {
        console.log(edges)
        setEdges(
            edge_data.map((data: edge, index: number) => ({
                id: index,
                source: `node-${data.origin}`,
                sourceHandle: data.origin_edge,
                target: `node-${data.destination}`,
                targetHandle: data.destination_edge,
                data: data
            }))
        );
    }, [edge_data]);

    useEffect(() => {
        if (nodes.length > 0) {
            setLoading(false); // Set loading to false when nodes are filled
        }
    }, [nodes]);

    if (loading) {
        return <p>Loading...</p>; // Render loading indicator
    }

    //console.log = console.warn = console.error = () => {};

    return (
        <div className="mx-auto w-4/5" >
            <div className="max-w-full and max-h-full">
                <ReactFlowProvider initialNodes={nodes} initialEdges={edges}>
                    <Flow nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} app_id={app_id}/>
                    <MiniMap />
                </ReactFlowProvider>
            </div>
        </div>
    );
}

export default DisplayPipeline;

/*
*                     <DraggableComponent
                        tmp_key={String(container.container_id)}
                        top={data[index].position_x}
                        left={data[index].position_x}
                        //top={coordinates['container' + container_id].y}
                        //left={coordinates['container' + container_id].x}
                        key={String(container_id)}
                    >
                        {container_id}
                    </DraggableComponent>
*
* */