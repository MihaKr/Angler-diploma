import React, {FC, useMemo, useState} from 'react';
import {defaultCoordinates, DndContext, DragEndEvent, DragStartEvent, Translate, useDraggable} from '@dnd-kit/core';
import {Coordinates, CSS} from '@dnd-kit/utilities';
import styles from "./DraggableComponent.module.css";
import DraggableComponent from "@/app/components/DraggableComponent";
import ContainerButton from "@/app/components/ContainerButton";
import containerButton from "@/app/components/ContainerButton";
import allContainers from "@/app/components/AllContainers";
import {number} from "prop-types";
import dataPut from "@/app/components/dataPut";
import {createSnapModifier} from "@dnd-kit/modifiers";

interface AllContainerProps {
    all_containers: any
    drag_func: any
}

interface AllContainers {
    container_id: string;
    container_name: string

}

const AllContainers: FC<AllContainerProps>= ({ all_containers, drag_func }) => {
//props.top != 0 ? `absolute left-${props.left}px top-${props.top}0x` : "justify-center"                 className={`left-[${props.top}px] top-[${props.top}px]`}
    const [gridSize, setGridSize] = React.useState(10);
    const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

    return (
        <DndContext onDragEnd={drag_func}
                    modifiers={[snapToGrid]}

        >
            <div className="flex flex-col items-start">
                <div className="flex flex-col items-start">
                    {all_containers.map((container: AllContainers, index: number) => (
                        <div key={container.container_id} className="p-4 flex justify-start">
                            <ContainerButton container_id={container.container_id}
                                             container_name={container.container_name}
                                             drag_func={drag_func}/>
                        </div>
                    ))}

                </div>
            </div>
        </DndContext>
    );
}

export default AllContainers;

/*
*

*         <DndContext onDragEnd={drag_func}
                    modifiers={[snapToGrid]}

        >
            <div className="flex-col">
                <div className="flex-col">
                    {all_containers.map((container: AllContainers, index: number) => (
                        <div key={container.container_id} className="w-full mb-10 p-4 flex">
                            <ContainerButton container_id={container.container_id}
                                             container_name={container.container_name}
                                             drag_func={drag_func}/>
                        </div>
                    ))}

                </div>
            </div>
        </DndContext>
*
* */