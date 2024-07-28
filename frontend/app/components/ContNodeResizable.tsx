import React, {useEffect, useState} from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import { number } from 'prop-types';
import {AllContainersI} from "@/app/types";
import axios from "axios";

const ContNodeResizable = ({ data}: { data: AllContainersI}) => {
    const [resizable, setResizable] = useState(true);
    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://0.0.0.0:8000/angler_core/files?app_cont_id=${data.app_container_id}`;
                const response = await axios.get(url);
                setFileData(response.data.file_content);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [data.text]);


    return (
        <div className="w-full h-full rounded-xl border border-black bg-white p-5 box-border">
            <div className="">
                <NodeResizer isVisible={resizable} minWidth={180} minHeight={100} />
                <div>
                    <div>{data.app_container_id}</div>
                    {fileData && (
                        <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {fileData}
                        </div>
                    )}
                </div>
                <Handle type="target" id="a" position={Position.Left}
                        style={{background: '#555', height: 16, width: 16}}/>
            </div>
        </div>
    );
};
export default ContNodeResizable;