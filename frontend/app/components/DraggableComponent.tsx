import React, {FC, useState} from 'react';
import {defaultCoordinates, Translate, useDraggable} from '@dnd-kit/core';
import {Coordinates, CSS} from '@dnd-kit/utilities';
import styles from "./DraggableComponent.module.css";

interface DraggableProps {
    tmp_key: string;
    children: number;
    top?: number;
    left?: number;
}

const DraggableComponent: FC<DraggableProps> = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.tmp_key,
        data: { title: props.children }
    });

//props.top != 0 ? `absolute left-${props.left}px top-${props.top}0x` : "justify-center"                 className={`left-[${props.top}px] top-[${props.top}px]`}
    return (
            <div
                id={props.tmp_key}
                ref={setNodeRef}
                className={`p-2 flex-1 border rounded hover:bg-gray-100 hover:cursor-pointer`}
                style={{
                    position: 'absolute',
                    top: `${props.top}px`,
                    left: `${props.left}px`,
                    transform: CSS.Translate.toString(transform),
                }}
                {...attributes}
                {...listeners}
                key={props.tmp_key}
            >
                {props.children}
            </div>
    );
}

export default DraggableComponent;
