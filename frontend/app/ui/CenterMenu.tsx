import Image from "next/image";
import DataDisplayer from "@/app/ui/datadisplayer";
import DataFetcher from "@/app/components/datafetcher";
import React, { useState } from 'react';
import {CenterMenuProps} from "@/app/types";



export const CenterMenu: React.FC<CenterMenuProps> = ({ apps, setApps, setShowModal, showModal, appValues, setAppValues }) => {

    return (
        <div className="">
            <div className="">
                <DataFetcher url="http://127.0.0.1:8000/angler_core/api" setData={setApps} />
                <DataDisplayer data={apps} setData={setApps} showModal={showModal} setShowModal={setShowModal} appValues={appValues} setAppValues={setAppValues}/>
            </div>
        </div>
    );
}
export default CenterMenu