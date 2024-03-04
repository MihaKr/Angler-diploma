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

//TODO dodaj en state za aktivne containerje ki se naloadjo iz fetch
//TODO dodaj en state za vse containerje ki se naloadjo iz fetch
//TODO duplIkat containerja ko dragan je na panel
//TODO puščica na container
//TODO snap to Container
//TODO run


const DisplayPipeline: React.FC<{ data: any }> = ({ data }) => {
    const DefaultCoordinates = [{ x: 0, y: 0 }, { x: 0, y: 0 }]; // Example default coordinates

    const [cartItems, setCartItems] = useState<string[]>([]);
    const [containers, setContainers] = useState<number[]>([]);
    const [active, setActive] = useState(0);
    const [coordinates, setCoordinates] = useState<{ [key: string]: Coordinates }>({
        "container0": { x: 0, y: 0 },
    });
    const [gridSize, setGridSize] = React.useState(10);

    const updateCoordinates = (key: string, newCoordinates: Coordinates) => {
        setCoordinates(prevCoordinates => ({
            ...prevCoordinates,
            [key]: newCoordinates
        }));
    };


    useEffect(() => {
        function createContainerArray(data: any): any[] {
            const temp = [];

            for (let i = 0; i < data.length; i++) {
                temp.push(data[i]["container_id"]);
                updateCoordinates("container" + data[i]["container_id"] as unknown as string, {x:0, y:0})
            }
            return temp;
        }

        const tempContainers = createContainerArray(data);
        setContainers(tempContainers);

    }, [data]);

    const addItemsToCart = (e: DragEndEvent) => {
        const newItem = e.active.data.current?.title;
        //if (e.over?.id !== "cart-droppable" || !newItem) return;
        const temp = [...cartItems];
        temp.push(newItem);
        setCartItems(temp);

        let delta = e.delta;

        // Ensure to use the current active container ID here
        const currentActive = String(active);
        updateCoordinates(currentActive, calculateCord(coordinates[currentActive].x, coordinates[currentActive].y, delta));
    };


    const handleDragStart = (e: DragStartEvent) => {
        setActive(e.active.id as unknown as number)
        let x = document.getElementById(String(e.active.id))

        if (x != null) {
            let rect = x.getBoundingClientRect();
            updateCoordinates(e.active.id as unknown as string, {x: rect.left, y: rect.top});
        }
        console.log(coordinates)
    }


    function calculateCord(x: number, y: number, delta: { x: number; y: number }): Coordinates {
        return {
            x: x + delta.x,
            y: y + delta.y,
        };
    }

    const snapToGrid = useMemo(() => createSnapModifier(gridSize), [gridSize]);


    useEffect(() => {
        console.log(coordinates);
    }, [coordinates]);


    return (
        <DndContext onDragEnd={addItemsToCart}
                    onDragStart={handleDragStart}
                    modifiers={[snapToGrid]}
        >

            <div className="max-w-full and max-h-full">
                {containers.map((container_id) => (
                    <DraggableComponent
                        tmp_key={'container' + container_id}
                        top={coordinates['container' + container_id].y}
                        left={coordinates['container' + container_id].x}
                        key={'container' + container_id}
                    >
                        {container_id}
                    </DraggableComponent>
                ))}
            </div>
        </DndContext>
    );
}

export default DisplayPipeline;

/*
*
*                     <h1>Fruit List</h1>
                    <div className={styles["fruit-list"]}>
                        {containers.map((container_id) => (
                            <DraggableComponent tmp_key={'container' + container_id} top={coordinates['container' +container_id].y} left={coordinates['container' +container_id].x} key={'container' +container_id}>{container_id}</DraggableComponent>
                        ))}
                    </div>
                </div>
                <div className={styles["cart-section"]}>
                    <h1>My Cart</h1>
                    <Pipeline items={cartItems} />
* */

/**/