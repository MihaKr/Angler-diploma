// components/DataDisplayer.tsx

import React, {useEffect, useState} from 'react';
import {ApplicationButton} from "@/app/components/AppSelectionButton";
import DraggableComponent from "@/app/components/DraggableComponent";
import {DndContext, DragEndEvent, DragStartEvent, DragOverlay, defaultCoordinates, Translate} from '@dnd-kit/core';
import Pipeline from "@/app/components/Pipeline";
import {createSnapModifier} from "@dnd-kit/modifiers";
import styles from "./App.module.css";

interface DisplayPipelineProps {
    data: "";
}

const DisplayPipeline: React.FC<{ data: any }> = ({ data }) => {
    const [cartItems, setCartItems] = useState<string[]>([]);
    const [containers, setContainers] = useState<number[]>([]);

    useEffect(() => {
        function createContainerArray(data: any): any[] {
            const temp = [];

            for (let i = 0; i < data.length; i++) {
                temp.push(data[i]["container_id"]);
            }

            return temp;
        }

        const tempContainers = createContainerArray(data);
        setContainers(tempContainers);

        console.log(data);
    }, [data]);

    console.log(containers)

    const addItemsToCart = (e: DragEndEvent) => {
        const newItem = e.active.data.current?.title;
        if (e.over?.id !== "cart-droppable" || !newItem) return;
        const temp = [...cartItems];
        temp.push(newItem);
        setCartItems(temp);
    };

    console.log(containers)

    return (
        <DndContext onDragEnd={addItemsToCart}>
            <main className={styles.main}>
                <div className={styles["fruit-list-section"]}>
                    <h1>Fruit List</h1>
                    <ul className={styles["fruit-list"]}>
                        {containers.map((container_id) => (
                            <DraggableComponent key={container_id}>{container_id}</DraggableComponent>
                        ))}
                    </ul>
                </div>
                <div className={styles["cart-section"]}>
                    <h1>My Cart</h1>
                    <Pipeline items={cartItems} />
                </div>
            </main>
        </DndContext>
    );


}

export default DisplayPipeline;

/*

  const fruits = ["Apple", "Banana", "Lemon", "Pear", "Mango"];
  const [cartItems, setCartItems] = useState<string[]>([]);

  const addItemsToCart = (e: DragEndEvent) => {
    const newItem = e.active.data.current?.title;
    if (e.over?.id !== "cart-droppable" || !newItem) return;
    const temp = [...cartItems];
    temp.push(newItem);
    setCartItems(temp);
  };

  return (
    <DndContext onDragEnd={addItemsToCart}>
      <main className={styles.main}>
        <div className={styles["fruit-list-section"]}>
          <h1>Fruit List</h1>
          <ul className={styles["fruit-list"]}>
            {fruits.map((fruit) => (
              <FruitDraggable key={fruit}>{fruit}</FruitDraggable>
            ))}
          </ul>
        </div>
        <div className={styles["cart-section"]}>
          <h1>My Cart</h1>
          <CartDroppable items={cartItems} />
        </div>
      </main>
    </DndContext>
  );
};

* */

