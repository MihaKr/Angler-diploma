import React, {FC, useState} from 'react';
import {defaultCoordinates, Translate, useDraggable} from '@dnd-kit/core';
import {Coordinates, CSS} from '@dnd-kit/utilities';
import styles from "./DraggableComponent.module.css";
import DraggableComponent from "@/app/components/DraggableComponent";

interface ContainerButtonProps {
    container_id: string
    container_name: string
    drag_func: any
}

const ContainerButton: FC<ContainerButtonProps>= ({ container_id,container_name, drag_func }) => {
    //props.top != 0 ? `absolute left-${props.left}px top-${props.top}0x` : "justify-center"                 className={`left-[${props.top}px] top-[${props.top}px]`}
    return (
        <button id={container_id} className="bg-Angler-Button_Blue rounded-2xl p-4 max-w-h-screen" onClick={drag_func}>
            {container_name}
        </button>
    );
}

export default ContainerButton;