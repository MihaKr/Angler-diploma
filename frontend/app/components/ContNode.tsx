import React from 'react';
import {Handle, Position} from "reactflow";
import {number} from "prop-types";

interface AllContainersI {
    app_container_id: number;
    container_name: string
    container_id: number;
    app_id: number;
    position: { x: number, y: number }
}

const ContNode = ({ data }: { data: AllContainersI }) => {
    console.log(data)
    return (
        <div style={{border: '1px solid #888', padding: 10, borderRadius: 10, background: '#fff', minWidth: 150}}>
            <div>{`App Container ID: ${data.app_container_id}`}</div>
            <div>{`Container Name: ${data.container_name}`}</div>
            <div>{`Position X: ${data.position.x}`}</div>
            <div>{`Position Y: ${data.position.y}`}</div>
            <Handle type="target" id="a" position={Position.Left} style={{background: '#555', height: 16, width: 16}}/>
            <Handle type="source" id="b" position={Position.Right} style={{background: '#555', height: 16, width: 16}}/>
        </div>
    );
};

/*
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}

 */

export default ContNode;