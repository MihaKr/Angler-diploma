import Image from "next/image";
import DataDisplayer from "@/app/ui/datadisplayer";
import DataFetcher from "@/app/components/datafetcher";
import React, { useState } from 'react';

export default function CenterMenu() {
    const [data, setData] = useState<any>([]);

    return (
        <div className=""> {/* Change justify-end to justify-start */}
            <div className="">
                <DataFetcher url="http://127.0.0.1:8000/angler_core/api" setData={setData} />
                <DataDisplayer data={data} />
            </div>
        </div>
    );
}
