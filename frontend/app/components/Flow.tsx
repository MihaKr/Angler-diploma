'use client';

import React, {FC, useCallback, useEffect, useState} from 'react';
import ReactFlow, {
    addEdge,
    Node,
    Edge,
    applyNodeChanges,
    applyEdgeChanges,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    NodeDragHandler, updateEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import ContNode from "@/app/components/ContNode";
import dataPut from "@/app/components/dataPut";
import postData from "@/app/components/dataPut";
import {number} from "prop-types";
import dataPost from "@/app/components/dataPost";
import deleteData from "@/app/components/dataDelete";

interface flowProps {
    nodes: any;
    setNodes: React.Dispatch<React.SetStateAction<any>>;
    edges: any;
    setEdges: React.Dispatch<React.SetStateAction<any>>;
    app_id: number
}

interface edgeP {
    app_id_link: number
    origin: number
    origin_edge: string
    destination: number
    destination_edge: string
}


const Flow: React.FC<flowProps> = ({nodes, setNodes, edges, setEdges,app_id}) => {
    const onNodesChange: OnNodesChange = useCallback(
        (chs) => {
            setNodes((nds: Node<any>[]) => {
                return applyNodeChanges(chs, nds);
            });
        },
        [setNodes]
    );

    const onEdgesChange: OnEdgesChange = useCallback(
        (chs) => {
            setEdges((eds: Edge<any>[]) => applyEdgeChanges(chs, eds));
        },
        [setEdges]
    );

    const onConnect: OnConnect = useCallback(
        (params) => {
            let f : edgeP = {
                app_id_link: app_id,
                // @ts-ignore
                origin: +params.source.replace('node-',''),
                // @ts-ignore
                origin_edge: params.sourceHandle,
                // @ts-ignore
                destination: +params.target.replace('node-',''),
                // @ts-ignore
                destination_edge: params.targetHandle,
            }

            console.log(f)

        dataPost(f,`http://0.0.0.0:8000/angler_core/cont_link?id=${app_id}`);
        //dataPut(node.data, `http://0.0.0.0:8000/angler_core/app_cont?id=${node.data.app_id}&app_cont_id=${node.data.app_container_id}`);
        console.log(params)
            setEdges((eds: Edge[]) => addEdge(params, eds));
        },
        [setEdges]
    );


    const onNodeDragStop = (event: any, node: any) => {

        node.data.position.x = Math.round(node.position.x);
        node.data.position.y = Math.round(node.position.y);

        dataPut(node.data, `http://0.0.0.0:8000/angler_core/app_cont?id=${node.data.app_id}&app_cont_id=${node.data.app_container_id}`);
    }

    const onEdgeUpdate = useCallback(
        (oldEdge:any, newEdge:any) => {
            setEdges((els: Edge[]) => updateEdge(oldEdge, newEdge, els));

        let f = {
            // @ts-ignore
            origin_old: +oldEdge.source.replace('node-',''),
            // @ts-ignore
            origin_edge_old: oldEdge.sourceHandle,
            // @ts-ignore
            destination_old: +oldEdge.target.replace('node-',''),
            // @ts-ignore
            destination_edge_old: oldEdge.targetHandle,
            // @ts-ignore
            origin_new: +newEdge.source.replace('node-',''),
            // @ts-ignore
            origin_edge_new: newEdge.sourceHandle,
            // @ts-ignore
            destination_new: +newEdge.target.replace('node-',''),
            // @ts-ignore
            destination_edge_new: newEdge.targetHandle,
        }

        dataPut(f,`http://0.0.0.0:8000/angler_core/cont_link?id=${app_id}`);
        },
        []
    );

    const onEdgeDelete =
        (edge: any) => {
        console.log(edge)
        deleteData(edge[0],`http://0.0.0.0:8000/angler_core/cont_link?id=${app_id}`)
        }

    const nodeTypes = { ContNode: ContNode };

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDragStop={onNodeDragStop}
                onEdgesDelete={onEdgeDelete}
                onEdgeUpdate={onEdgeUpdate}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
            />
        </div>
    );
}

export default Flow;

/*
    const updateDb = () => {
        for (let n = 0; n < nodes.length; n++) {
            nodes[n].data.position.x = nodes[n].position.x
            nodes[n].data.position.y = nodes[n].position.y
            console.log(nodes[n].position.y)

            //dataPut(nodes[n].data, `http://0.0.0.0:8000/angler_core/app_cont?id=${data[n].app_id}&app_cont_id=${data[n].app_container_id}`)
        }
    }
 */