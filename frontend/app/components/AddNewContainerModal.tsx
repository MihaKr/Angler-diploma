import React, {FC, FormEvent, MouseEventHandler, useState} from 'react';
import postData from "@/app/components/dataPost";
import {AddNewContainerModalProps, MyData} from "@/app/types";
declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: string;
    }
}

export const AddNewContainerModal: React.FC<AddNewContainerModalProps> = ({ showModal, setShowModal, allContainers, setAllContainers, successMessage, setSuccessMessage}) => {
    const [containerName, setContainerName] = useState("");
    const [containerGroup, SetContainerGroup] = useState("");
    const [containerPath, setContainerPath] = useState("");
    const [containerFolder, setContainerFolder] = useState<FileList | null>(null);
    const [nodeType, setNodeType] = useState('');



    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setContainerFolder(e.target.files);
        }
    }

    const handleClickBackground: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if((event.target as HTMLDivElement).id == 'background-modal') {
            if (setShowModal) {
                setShowModal(false)
            }
        }
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data: MyData = {
            container_name: containerName,
            container_group: containerGroup,
            container_path: containerPath,
            container_type: nodeType
        };

        try {
            await postData(data, 'http://127.0.0.1:8000/angler_core/all_cont');

            if (containerFolder) {
                for (let i = 0; i < containerFolder.length; i++) {
                    const formData = new FormData();
                    formData.append('file', containerFolder[i]);
                    formData.append('name', containerName);

                    console.log('Uploading file:', containerFolder[i].name);

                    await postData(formData, 'http://127.0.0.1:8000/angler_core/files');
                }
            }

            setAllContainers(prevState => [
                ...prevState,
                {
                    container_name: containerName,
                    container_group: containerGroup,
                    container_type: nodeType

                }
            ]);

            if (setShowModal) {
                setShowModal(false);
            }
            setSuccessMessage('Container added successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    }


    function AppTyped(e: React.ChangeEvent<HTMLInputElement>) {
        setContainerName(e.target.value);
    }

    function groupType(e: React.ChangeEvent<HTMLInputElement>) {
        SetContainerGroup(e.target.value);
    }

    function setRadio(e: React.ChangeEvent<HTMLInputElement>) {
        setNodeType(e.target.value);
    }


    return (
        <dialog open={showModal} className="modal z-50">
            <div
                id="background-modal"
                className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
                onClick={handleClickBackground}
            >
                <div
                    id="form-modal"
                    className="bg-white p-6 rounded-lg shadow-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h1 className="text-center text-lg font-semibold text-gray-800 mb-4">
                        Add New Container
                    </h1>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <div>
                            <label
                                htmlFor="container-name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Container Name
                            </label>
                            <input
                                id="container-name"
                                type="text"
                                value={containerName}
                                onChange={AppTyped}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="container-group"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Container Group
                            </label>
                            <input
                                id="container-group"
                                type="text"
                                value={containerGroup}
                                onChange={groupType}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="container-path"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Container Path
                            </label>
                            <input
                                id="container-path"
                                type="file"
                                webkitdirectory="true"
                                onChange={handleFileChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label htmlFor="ContNode">Regular Node</label><br/>
                            <input
                                type="radio"
                                id="ContNode"
                                name="nodeType"
                                value="ContNode"
                                checked={nodeType === 'ContNode'}
                                onChange={setRadio}
                            />
                            <label htmlFor="ContNodeResizable">View Node</label><br/><br/>
                            <input
                                type="radio"
                                id="ContNodeResizable"
                                name="nodeType"
                                value="ContNodeResizable"
                                checked={nodeType === 'ContNodeResizable'}
                                onChange={setRadio}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
                            >
                                Add Container
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default AddNewContainerModal;
