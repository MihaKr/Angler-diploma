import Image from "next/image";
import DataDisplayer from "@/app/ui/datadisplayer";
import DataFetcher from "@/app/components/datafetcher";
import React, { useState } from 'react';


interface CenterMenuProps {
    apps: []
    setApps: React.Dispatch<React.SetStateAction<any[]>>;
}

export const CenterMenu: React.FC<CenterMenuProps> = ({ apps, setApps }) => {

    return (
        <div className=""> {/* Change justify-end to justify-start */}
            <div className="">
                <DataFetcher url="http://127.0.0.1:8000/angler_core/api" setData={setApps} />
                <DataDisplayer data={apps} />
            </div>
        </div>
    );
}
export default CenterMenu