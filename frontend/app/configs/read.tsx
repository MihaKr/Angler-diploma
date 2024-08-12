import React, {useEffect, useState} from 'react';
import dataPost from "@/app/components/dataPost";
import dataPut from "@/app/components/dataPut";

interface ArgObj {
    [key: number]: { args: string };
}

interface MyComponentProps {
    contArgs: object
    setcontArgs: React.Dispatch<React.SetStateAction<ArgObj>>;
    app_cont_id: string
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
}

const Config: React.FC<MyComponentProps> = ({ contArgs, setcontArgs, app_cont_id , setShowModal}) => {
    const [file, setFile] = useState<File | null>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    useEffect(() => {
    }, [contArgs]);

    async function save() {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('app_container_id', app_cont_id);

            try {
                const response = await dataPost(formData, `http://0.0.0.0:8000/angler_core/files`);
                console.log("File upload response:", response);
            } catch (error) {
                console.error("Error uploading file:", error);
            }

            setcontArgs(prevState => {
                const newState = {
                    ...prevState,
                    [app_cont_id]: { 'FILEPATH': file.name, 'app_cont_id': String(app_cont_id)}
                };
                dataPut({ 'FILEPATH' : file.name, 'app_cont_id': String(app_cont_id)  }, `http://0.0.0.0:8000/angler_core/app_cont?app_cont_id=${app_cont_id}`);
                console.log("Inside setState callback:", newState);
                if (setShowModal) {
                    setShowModal(false)
                }
                return newState;
            });
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Read Config</h1>
            <div className="md:flex md:items-center mb-6">

                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="container-name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            File
                        </label>
                        <input
                            id="File"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <button onClick={save}

                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Config;

/*
*
*         <div>
            <h1 className="text-2xl font-semibold mb-4">Read Config</h1>
            <div className="md:flex md:items-center mb-6">
                <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                    Read file
                </label>
                <input
                    className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name" type="file" onChange={handleFileChange}
                />
            </div>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl"
                        onClick={save}>
                    Save Changes
                </button>
            </div>
        </div>
* */