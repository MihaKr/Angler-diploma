import React, { FC } from 'react';
import ContNode from "@/app/components/ContNode"; // Adjust the import path accordingly

interface ContainerButtonProps {
    container_id: string;
    container_name: string;
    drag_func: any;
    type: string;
}

const ContainerButton: FC<ContainerButtonProps> = ({ container_id, container_name, drag_func, type }) => {

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, node: string) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ node, container_id, container_name, type }));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
            <div className=" px-2 py-2 flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 z-50" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                {container_name}
            </div>
    );
}

export default ContainerButton;



/*
*
* const ContainerButton: FC<ContainerButtonProps> = ({ container_id, container_name }) => {
    return (
        <div className="px-2 py-2">
            <DraggableComponent tmp_key={container_id}>
                {container_name}
            </DraggableComponent>
        </div>
    );
    *
    * onDragStart={(event) => onDragStart(event, 'input')} draggable>
}
* */