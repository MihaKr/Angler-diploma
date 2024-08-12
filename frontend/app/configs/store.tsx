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
    const [fileType, setFileType] = useState('');

    function setRadio(e: React.ChangeEvent<HTMLInputElement>) {
        setFileType(e.target.value);
    }

    function pathType(e: React.ChangeEvent<HTMLInputElement>) {
        setfilePath(e.target.value);
    }

    useEffect(() => {
    }, [contArgs]);

    function save() {
        setcontArgs(prevState => {
            const newState = {
                ...prevState,
                [app_cont_id]: { 'FILEPATH' : filePath, 'app_cont_id':String(app_cont_id)}
            };
            dataPut({ 'FILEPATH' : filePath, 'fileType' : fileType, 'app_cont_id':String(app_cont_id)  }, `http://0.0.0.0:8000/angler_core/app_cont?app_cont_id=${app_cont_id}`);
            console.log("Inside setState callback:", newState);
            if (setShowModal) {
                setShowModal(false)
            }
            return newState;
        });
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Store Config</h1>
            <div className="md:flex md:items-center mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Store As:</label>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="JSON"
                            value="JSON"
                            checked={fileType === 'JSON'}
                            onChange={setRadio}
                            className="mr-2"
                        />
                        <label htmlFor="JSON" className="mr-4">JSON text file</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="Conllu"
                            value="Conllu"
                            checked={fileType === 'Conllu'}
                            onChange={setRadio}
                            className="mr-2"
                        />
                        <label htmlFor="Conllu" className="mr-4">Conllu</label>
                    </div>
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Store Path
                </label>
                <input
                    className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    value={filePath}
                    onChange={pathType}
                />
            </div>
            <div>
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
                    onClick={save}>
                    Save Changes
                </button>
            </div>
        </div>

    );
};

export default Config;

/*


        <div>
            <h1 className="text-2xl font-semibold mb-4">Store Config</h1>
            <div className="md:flex md:items-center mb-6">
                <label>Store As:</label><br/>
                <label htmlFor="ContNode">JSON text file</label><br/>
                <input
                    type="radio"
                    id="JSON"
                    value="JSON"
                    checked={fileType === 'JSON'}
                    onChange={setRadio}
                />
                <label htmlFor="ContNodeResizable">Conllu</label><br/><br/>
                <input
                    type="radio"
                    id="Conllu"
                    value="Conllu"
                    checked={fileType === 'Conllu'}
                    onChange={setRadio}
                />
            </div>
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
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
                    onClick={save}>
                    Save Changes
                </button>
            </div>
        </div>
 */
