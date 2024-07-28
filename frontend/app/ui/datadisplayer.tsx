// components/DataDisplayer.tsx

import React from 'react';
import {ApplicationButton} from "@/app/components/AppSelectionButton";
import {it} from "node:test";

const DataDisplayer: React.FC<{ data: any }> = ({ data }) => {

    const sortedData = data.sort((a: any, b: any) => {
        return new Date(b.app_date_last_modified).getTime() - new Date(a.app_date_last_modified).getTime();
    });

    return (
        <div className="flex justify-center px-4">
            <div className="grid grid-cols-3 gap-5 max-w-8xl">
                <div className="col-span-3">
                    <h1 className="text-gray-700 font-bold text-center">Recent files</h1>
                </div>
                {sortedData.slice(0, 9).map((item: any) => (
                    <div key={item.app_id} className="p-4">
                        <ApplicationButton description={item.short_desc} text={item.app_name} app_id={item.app_id} date_last_modified={item.app_date_last_modified}/>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default DataDisplayer;
