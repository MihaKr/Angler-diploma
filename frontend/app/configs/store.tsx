// @ts-ignore
import React, {useEffect, useState} from 'react';
import dataPut from "@/app/components/dataPut";

interface ArgObj {
    [key: number]: { args: string };
}
interface MyComponentProps {
    contArgs: object
    setcontArgs:React.Dispatch<React.SetStateAction<ArgObj>>;
    app_cont_id: string
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;

}

const Config: React.FC<MyComponentProps> = ({ contArgs, setcontArgs, app_cont_id, setShowModal }) => {
    const [filePath, setfilePath] = useState("");

    function pathType(e: React.ChangeEvent<HTMLInputElement>) {
        setfilePath(e.target.value);
    }

    useEffect(() => {
    }, [contArgs]);

    function save() {
        setcontArgs(prevState => {
            const newState = {
                ...prevState,
                [app_cont_id]: { 'FILEPATH' : filePath }
            };
            dataPut({ 'FILEPATH' : filePath }, `http://0.0.0.0:8000/angler_core/app_cont?app_cont_id=${app_cont_id}`);
            console.log("Inside setState callback:", newState);
            if (setShowModal) {
                setShowModal(false)
            }
            return newState;
        });
    }

    return (
        <div>
            <h1>Component Config</h1>
            <div className="md:flex md:items-center mb-6">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Store Path
                </label>
                <input
                    className="side-menu_gray appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name" type="text" value={filePath} onChange={pathType}
                />
            </div>
            <div>
                <button className="bg-Angler-Button_Blue hover:bg-blue-700 rounded-2xl p-4"
                        onClick={save}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Config;
