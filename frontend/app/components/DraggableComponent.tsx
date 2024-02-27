import React, {FC} from 'react';
import {Translate, useDraggable} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import {createSnapModifier} from '@dnd-kit/modifiers';
import styles from "./DraggableComponent.module.css";

interface DraggableProps {
    children: number;
}

const DraggablecComponent: FC<DraggableProps> = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.children,
        data: { title: props.children }
    });

    const style = transform ? {
        translate: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            className={styles["fruit-item"]}
            style={{ transform: CSS.Translate.toString(transform) }}
            {...attributes}
            {...listeners}
        >
            {props.children}
        </div>
    );
}

export default DraggablecComponent;
/*

interface IFruitDraggable {
  children: string;
}

const FruitDraggable: FC<IFruitDraggable> = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.children,
    data: { title: props.children }
  });

  return (
    <div
      ref={setNodeRef}
      className={styles["fruit-item"]}
      style={{ transform: CSS.Translate.toString(transform) }}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </div>
  );
};

export default FruitDraggable;
 */