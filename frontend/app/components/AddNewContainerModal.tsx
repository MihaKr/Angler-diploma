import React, {FC, FormEvent, MouseEventHandler, useState} from 'react';
import postData from "@/app/components/dataPost";

interface AddNewContainerModalProps {
    showModal: boolean;
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
}

type MyData = {
    container_name: string;
    container_group: string;
    container_path: string;
};

export const AddNewContainerModal: React.FC<AddNewContainerModalProps> = ({ showModal, setShowModal }) => {
    const [containerName, setContainerName] = useState("");
    const [containerGroup, SetContainerGroup] = useState("");
    const [containerPath, setContainerPath] = useState("");


    const handleClickBackground: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if((event.target as HTMLDivElement).id == 'background-modal') {
            if (setShowModal) {
                setShowModal(false)
            }
        }
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        //const formData = new FormData(event.currentTarget);

        //console.log(formData)

        const data: MyData = {
            container_name: containerName,
            container_group: containerGroup,
            container_path: containerPath

        };
        postData(data,'http://127.0.0.1:8000/angler_core/all_cont')

        // @ts-ignore
        setShowModal(false); // Close the dialog when the form is submitted
    }

    function AppTyped(e: React.ChangeEvent<HTMLInputElement>) {
        setContainerName(e.target.value);
    }

    function groupType(e: React.ChangeEvent<HTMLInputElement>) {
        SetContainerGroup(e.target.value);
    }

    function pathType(e: React.ChangeEvent<HTMLInputElement>) {
        setContainerPath(e.target.value);
    }

    return (
        <dialog open={showModal} className="modal z-50">
            <div id={"background-modal"} className={"fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75"} onClick={handleClickBackground}>
                <div id={"form-modal"} className={"rounded-lg bg-Angler-Text-Grey p-4 inline-block items-center justify-center bg"}>
                    <div className="block text-Angler-Dark_Blue font-bold text-center md:mb-0 pr-4 pb-4 pt-4">
                        <h1>Create New App</h1>
                    </div>
                    <form className="w-full max-w-sm" onSubmit={onSubmit}>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Container Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="side-menu_gray appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name" type="text" value={containerName} onChange={AppTyped}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Container Group
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="side-menu_gray appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name" type="text" value={containerGroup} onChange={groupType}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Container Path
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="side-menu_gray appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-full-name" type="text" value={containerPath} onChange={pathType}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button
                                    className="shadow bg-Angler-Dark_Blue hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="submit">
                                    Create App
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default AddNewContainerModal;
