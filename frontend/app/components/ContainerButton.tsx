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
        <div className={"w-full px-2 py-2"}>
            <DraggableComponent tmp_key={String(container_id)}>
                {container_name}
            </DraggableComponent>
        </div>

    );
}

export default ContainerButton;
