// components/DataDisplayer.tsx

import React from 'react';

const DataDisplayer: React.FC<{ data: any }> = ({ data }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <h1 className="text-xl font-bold">Recent files</h1>
            </div>
            {data.map((item: any) => (
                <div key={item.app_id} className="bg-gray-200 p-4">
                    <p className="font-semibold">{item.app_name}</p>
                </div>
            ))}
        </div>
    );
};


export default DataDisplayer;
