// @ts-ignore
import React, { useState } from 'react';

// Define the props interface
interface MyComponentProps {
    title: string;
    initialCount: number;
}

const config: React.FC<MyComponentProps> = ({ title, initialCount }) => {
    // State management
    const [count, setCount] = useState(initialCount);

    // Event handler
    const handleIncrement = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>{title}</h1>
            <p>Current count: {count}</p>
            <button onClick={handleIncrement}>Increment</button>
        </div>
    );
};

export default config;
