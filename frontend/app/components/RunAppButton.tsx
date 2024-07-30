import React, {FC} from 'react';
import dataPost from "@/app/components/dataPost";
import {ContainerButtonProps} from "@/app/types";

const RunAppButton: FC<ContainerButtonProps> = ({ app_id, successMessage, setSuccessMessage, allContainers, setAllContainers}) => {
    const updateAttributeForAll = () => {
        const updatedItems = allContainers.map((item:any) => ({
            ...item,
            text: new Date().toISOString(),
        }));
        setAllContainers(updatedItems);
    };

    const onClickRunHandler = () => {
        let f = {
            "app_id": app_id
        }
        //dataPost(f, 'http://127.0.0.1:8000/angler_core/run_app')
        setSuccessMessage('App run started!');

        console.log(f)

        fetch('http://localhost:8000/angler_core/run_app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(f)
        })
            .then(response => {
                if (!response.ok) {
                    setSuccessMessage('error run failed')
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSuccessMessage('App run finished!');
                setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
                updateAttributeForAll();

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

            console.log(allContainers)

        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    }

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                onClick={onClickRunHandler}>
                Run App
            </button>
        </div>
    );
}

export default RunAppButton
