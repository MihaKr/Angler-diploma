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
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
    }, [contArgs]);

    function save() {
        let filePath='1'
        setcontArgs(prevState => {
            const newState = {
                ...prevState,
                [app_cont_id]: { 'FILEPATH' : filePath }
            };
            dataPut({ 'FILEPATH' : filePath, 'lang': selectedValue }, `http://0.0.0.0:8000/angler_core/app_cont?app_cont_id=${app_cont_id}`);
            console.log("Inside setState callback:", newState);
            if (setShowModal) {
                setShowModal(false)
            }
            return newState;
        });
        }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Stanza POS Config</h1>
            <div className="md:flex md:items-center mb-6 space-y-4">
            </div>
            <div className="md:flex md:items-center mb-6">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Choose Language
                </label>
                <select id="dropdown" value={selectedValue} onChange={handleChange}>
                    <option value="">--Select a Language--</option>
                    <option value="en">English</option>
                    <option value="zh">Chinese</option>
                    <option value="es">Spanish</option>
                    <option value="ar">Arabic</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="pt">Portuguese</option>
                    <option value="ja">Japanese</option>
                    <option value="es">Spanish</option>
                    <option value="hi">Hindi</option>
                </select>
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
