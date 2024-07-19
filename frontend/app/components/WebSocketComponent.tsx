import React, { useEffect, useState } from 'react';

interface logProps {
    check: any;
}

const WebSocketComponent: React.FC<logProps>  = ({ check }) => {
    const [message, setMessage] = useState<any>([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/path/');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessage((prevMessages:any)  => [...prevMessages, data.message]);
            console.log(message);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, [check]);

    return (
        <div className="flex flex-col flex-1">
            <div className="flex-1 bg-gray-300 w-full p-2 overflow-auto">
                {message.map((mes: string, index: number) => (
                    <div key={index} className="flex justify-between items-center text-gray-700 mb-1">
                        <span>{mes}</span>
                    </div>
                ))}
            </div>
        </div>

    )
};

export default WebSocketComponent;
