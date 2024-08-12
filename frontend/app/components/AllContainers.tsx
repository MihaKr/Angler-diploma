import React, {FC, useMemo, useState} from 'react';
import {defaultCoordinates, DndContext, DragEndEvent, DragStartEvent, Translate, useDraggable} from '@dnd-kit/core';
import {Coordinates, CSS} from '@dnd-kit/utilities';
import styles from "./DraggableComponent.module.css";
import ContainerButton from "@/app/components/ContainerButton";
import {createSnapModifier} from "@dnd-kit/modifiers";
import {type} from "node:os";
import {AllContainerProps, AllContainers} from "@/app/types";


const AllContainers: FC<AllContainerProps>= ({ all_containers, drag_func }) => {
//props.top != 0 ? `absolute left-${props.left}px top-${props.top}0x` : "justify-center"                 className={`left-[${props.top}px] top-[${props.top}px]`}
    const [gridSize, setGridSize] = React.useState(10);
    const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

    return (

        <div className="grid grid-cols-3 gap-4 max-h-36 overflow-y-auto">
            {all_containers.map((container: AllContainers, index: number) => (
                <div key={container.container_id} className="p-2">
                    <ContainerButton
                        container_id={container.container_id}
                        container_name={container.container_name}
                        drag_func={drag_func}
                        type={container.container_type}
                    />
                </div>
            ))}
        </div>

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