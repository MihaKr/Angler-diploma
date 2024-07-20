import React, { FC } from 'react';
import DraggableComponent from './DraggableComponent'; // Adjust the import path accordingly

interface PipelineContainerProps {
    tmp_key: string;
    children: React.ReactNode;
    top?: number;
    left?: number;
}

const PipelineContainer: FC<PipelineContainerProps> = (props) => {
    return (
        <div>
            <DraggableComponent
                tmp_key={props.tmp_key}
                top={props.top}
                left={props.left}
            >
                {props.children}
            </DraggableComponent>
            <div
                draggable="true"
                className="w-2 h-2 rounded-full bg-gray-500"
                style={{
                    position: 'absolute',
                    top: props.top !== undefined ? `${props.top}px` : undefined,
                    left: props.left !== undefined ? `${props.left}px` : undefined,
                }}
            ></div>
        </div>
    );
}

export default PipelineContainer;
