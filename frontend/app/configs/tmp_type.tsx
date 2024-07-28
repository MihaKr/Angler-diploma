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

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Read Config</h1>
            <div className="md:flex md:items-center mb-6">

                <div className="space-y-4">
                    <div>
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