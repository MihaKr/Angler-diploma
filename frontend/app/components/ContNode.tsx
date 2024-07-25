import React, {useState} from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import { number } from 'prop-types';

interface AllContainersI {
    app_container_id: number;
    container_name: string;
    container_id: number;
    app_id: number;
    position: { x: number, y: number };
}

const ContNode = ({ data,}: { data: AllContainersI }) => {
    console.log(data);
    const [resizable, setResizable] = useState(false);

    return (
        <div className="w-full h-full rounded-xl border border-black bg-white p-5 box-border">
            <div className="">
                <NodeResizer isVisible={resizable} minWidth={180} minHeight={100} />
                <div>
                    <div>{`App Container ID: ${data.app_container_id}`}</div>
                    <div>{`Container Name: ${data.container_name}`}</div>
                    <div>{`Position X: ${data.position.x}`}</div>
                    <div>{`Position Y: ${data.position.y}`}</div>
                </div>
                <Handle type="target" id="a" position={Position.Left}
                        style={{background: '#555', height: 16, width: 16}}/>
                <Handle type="source" id="b" position={Position.Right}
                        style={{background: '#555', height: 16, width: 16}}/>
            </div>
        </div>
    );
            };

                export default ContNode;