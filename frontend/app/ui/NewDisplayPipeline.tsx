// components/DataDisplayer.tsx

import React, {useEffect, useMemo, useState} from 'react';
import ReactFlow, {Edge, ReactFlowProvider, Node, Background, useStoreApi, Position, MiniMap} from "reactflow";
import Flow from "@/app/components/Flow";

interface AllContainersI {
    app_container_id: number;
    container_id: number;
    app_id: number;
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
    setShowModal : React.Dispatch<React.SetStateAction<boolean>>;
    app_cont_id: string;
    setApp_cont_id:  React.Dispatch<React.SetStateAction<string>>;
    conf_file: String;
    setConfFile:  React.Dispatch<React.SetStateAction<string>>;
    allCont: []
}

const nodeSize = {
    width: 100,
    height: 40,
};

interface Container {
    container_id: string
    container_name: string
    container_group: any
}


const DisplayPipeline: React.FC<DisplayPipelineProps> = ({ data, updateData, edge_data, update_edge, app_id, setShowModal, app_cont_id, setApp_cont_id, conf_file, setConfFile, allCont }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [loading, setLoading] = useState(true);

    console.log(nodes)

    useEffect(() => {
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



    return (
            <div className="max-w-full and max-h-full">
                <ReactFlowProvider     // @ts-ignore
                    initialNodes={nodes} initialEdges={edges}>
                    <Flow nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} app_id={app_id} setShowModal={setShowModal}
                    setApp_cont_id={setApp_cont_id} app_cont_id={app_cont_id} setConfFile={setConfFile} conf_file={conf_file}/>
                </ReactFlowProvider>
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