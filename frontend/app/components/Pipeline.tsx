import React, {FC} from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from "./Pipeline.module.css";


interface DroppableProps {
    items: string[];
}

const Pipeline: FC<DroppableProps> = (props) => {
    const { setNodeRef } = useDroppable({
        id: "cart-droppable"
    });

    return (
        <ul className={styles.cart} ref={setNodeRef}>
            {props.items.map((item, idx) => (
                <div key={`${item}-${idx}`} className={styles["cart-item"]}>
                    {item}
                </div>
            ))}
        </ul>
    );
}

export default Pipeline;

/*

import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";
import styles from "./CartDroppable.module.css";

interface ICartDroppable {
  items: string[];
}

const CartDroppable: FC<ICartDroppable> = (props) => {
  const { setNodeRef } = useDroppable({
    id: "cart-droppable"
  });

  return (
    <ul className={styles.cart} ref={setNodeRef}>
      {props.items.map((item, idx) => (
        <div key={`${item}-${idx}`} className={styles["cart-item"]}>
          {item}
        </div>
      ))}
    </ul>
  );
};

export default CartDroppable;
 */