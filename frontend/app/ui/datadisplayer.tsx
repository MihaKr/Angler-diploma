// components/DataDisplayer.tsx

import React from 'react';
import {ApplicationButton} from "@/app/components/AppSelectionButton";

const DataDisplayer: React.FC<{ data: any }> = ({ data }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <h1 className="text-Angler-Text-Grey font-bold">Recent files</h1>
            </div>
            {data.map((item: any) => (
                <div key={item.app_id} className="bg-gray-200 p-4">
                    <ApplicationButton text={item.app_name} app_id={item.app_id}/>
                </div>
            ))}
        </div>
    );
};


export default DataDisplayer;
