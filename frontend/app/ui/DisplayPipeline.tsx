// components/DataDisplayer.tsx

import React, {useEffect, useMemo, useState} from 'react';
import {ApplicationButton} from "@/app/components/AppSelectionButton";
import DraggableComponent from "@/app/components/DraggableComponent";
import {DndContext, DragEndEvent, DragStartEvent, DragOverlay, defaultCoordinates, Translate} from '@dnd-kit/core';
import Pipeline from "@/app/components/Pipeline";
import {createSnapModifier} from "@dnd-kit/modifiers";
import styles from "./App.module.css";
import {Coordinates, CSS} from "@dnd-kit/utilities";
import {act} from "react-dom/test-utils";
import {number} from "prop-types";

//TODO dodaj en state za aktivne containerje ki se naloadjo iz fetch
//TODO dodaj en state za vse containerje ki se naloadjo iz fetch
//todo predelaj celo kodo tudi da bo gledlo iz app containerja za position
//TODO duplIkat containerja ko dragan je na panel
//TODO puščica na container
//TODO snap to Container
//TODO run

//TODO overlay za nov drag

interface AllContainersI {
    app_container_id: number;
    container_id: number;
    app_id: number;
    prev_container: number;
    next_container: number;
    position_x: number;
    position_y: number;
}

interface DisplayPipelineProps {
    data: any;
    updateData: React.Dispatch<React.SetStateAction<any>>;
}

const DisplayPipeline: React.FC<DisplayPipelineProps> = ({ data, updateData }) => {
    const [cartItems, setCartItems] = useState<string[]>([]);
    const [active, setActive] = useState(0);
    const [gridSize, setGridSize] = React.useState(10);

    const updateCoordinates = (key: number, newCoordinates: Coordinates) => {
        let tmp = [...data];

        tmp[key].position_x = newCoordinates.x;
        tmp[key].position_y = newCoordinates.y;

        updateData(tmp)
    };

    const get_ind = (arr: AllContainersI[], key: number) => {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].app_container_id== key) {
                return i
            }
        }
        return null
    };

    const addItemsToCart = (e: DragEndEvent) => {
        const newItem = e.active.data.current?.title;
        //if (e.over?.id !== "cart-droppable" || !newItem) return;
        const temp = [...cartItems];
        temp.push(newItem);
        setCartItems(temp);

        let delta = e.delta;

        const currentActive = String(active);
        // @ts-ignore
        let n:number = get_ind([...data],+currentActive)

        console.log(calculateCord(data[n].position_x, data[n].position_y, delta))

        updateCoordinates(n, calculateCord(data[n].position_x, data[n].position_y, delta));
    };


    const handleDragStart = (e: DragStartEvent) => {
        setActive(e.active.id as unknown as number)
        let x = document.getElementById(String(e.active.id))

        if (x != null) {
            let rect = x.getBoundingClientRect();
            // @ts-ignore
            let n:number = get_ind([...data], e.active.id)
            updateCoordinates(n, {x: rect.left, y: rect.top});
        }
    }


    function calculateCord(x: number, y: number, delta: { x: number; y: number }): Coordinates {
        return {
            x: x + delta.x,
            y: y + delta.y,
        };
    }

    const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);

    // @ts-ignore
    // @ts-ignore

    console.log(typeof(data))
    return (
        <DndContext onDragEnd={addItemsToCart}
                    onDragStart={handleDragStart}
                    modifiers={[snapToGrid]}
        >

            <div className="max-w-full and max-h-full">
                {data.map((container:AllContainersI, index: number,) => (
                    <DraggableComponent
                        tmp_key={String(container.app_container_id)}
                        top={container.position_y}
                        left={container.position_x}
                        //top={coordinates['container' + container_id].y}
                        //left={coordinates['container' + container_id].x}
                        key={String(container.app_container_id)}
                    >
                        {container.app_container_id}
                    </DraggableComponent>
                ))}
            </div>
        </DndContext>
    );
}

export default DisplayPipeline;

/*
*                     <DraggableComponent
                        tmp_key={String(container.container_id)}
                        top={data[index].position_x}
                        left={data[index].position_x}
                        //top={coordinates['container' + container_id].y}
                        //left={coordinates['container' + container_id].x}
                        key={String(container_id)}
                    >
                        {container_id}
                    </DraggableComponent>
*
* */