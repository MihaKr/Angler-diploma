import React, {DragEventHandler, FC, MouseEventHandler, useState} from 'react';
import {defaultCoordinates, DragStartEvent, Translate, useDraggable} from '@dnd-kit/core';
import {Coordinates, CSS} from '@dnd-kit/utilities';
import styles from "./DraggableComponent.module.css";
import DraggableComponent from "@/app/components/DraggableComponent";
import {number} from "prop-types";

interface DraggableProps {
    tmp_key: string;
    children: number;
    top?: number;
    left?: number;
}

const PipelineContainer: FC<DraggableProps> = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.tmp_key,
        data: { title: props.children }
    });

    const handleDragEnd = (e: DragEvent) => {
        console.log(e.clientY)
    }

//props.top != 0 ? `absolute left-${props.left}px top-${props.top}0x` : "justify-center"                 className={`left-[${props.top}px] top-[${props.top}px]`}
    return (
        <div>
            <DraggableComponent tmp_key={props.tmp_key}
                                top={props.top}
                                left={props.left}
                                key={props.tmp_key}
                                children={props.children}
            />
            <div
                draggable="true"
                className="w-2 h-2 rounded-full bg-gray-500"
                 style={{
                     position: 'absolute',
                     top: `${props.top}px`,
                     left: `${props.left}px`,
                     transform: CSS.Translate.toString(transform),
                 }}
                onDragEnd={handleDragEnd}

               ></div>
        </div>
    );
}

export default PipelineContainer;
