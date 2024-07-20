import React, { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DraggableProps {
    tmp_key: string;
    children: React.ReactNode;
    top?: number;
    left?: number;
}

const DraggableComponent: FC<DraggableProps> = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.tmp_key,
        data: { title: props.children }
    });

    return (
        <div
            id={props.tmp_key}
            ref={setNodeRef}
            className="p-2 flex-1 border rounded hover:bg-gray-100 hover:cursor-pointer"
            style={{
                position: 'absolute',
                top: props.top !== undefined ? `${props.top}px` : undefined,
                left: props.left !== undefined ? `${props.left}px` : undefined,
                transform: CSS.Translate.toString(transform),
            }}
            {...attributes}
            {...listeners}
        >
            {props.children}
        </div>
    );
}

export default DraggableComponent;
