// @ts-ignore
import React, { useState } from 'react';

interface MyComponentProps {
    contArgs: object
    setcontArgs:React.Dispatch<React.SetStateAction<object>>;
    app_cont_id: string
}

const config: React.FC<MyComponentProps> = ({ contArgs, setcontArgs }) => {
    const [filePath, setfilePath] = useState("");

    function pathType(e: React.ChangeEvent<HTMLInputElement>) {
        setfilePath(e.target.value);
    }

    function save() {
        //if(contArgs[])
    }

    return (
        <div>
            <h1>Read Config</h1>
                <div className="md:flex md:items-center mb-6">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Container Path
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

export default config;
