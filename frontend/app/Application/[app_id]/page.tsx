'use client'

import {useRouter} from 'next/navigation'
import React, {useEffect, useState} from "react";
import SideMenu from "@/app/ui/SideMenu";
import CenterMenu from "@/app/ui/CenterMenu";
import DataFetcher from "@/app/components/datafetcher";
import DisplayPipeline from "@/app/ui/DisplayPipeline";
import DragableComponent from "@/app/components/DraggableComponent";

// pages/index.tsx


export default function Page({ params }: { params: { app_id: number } }) {
    const [data, setData] = useState<any>([]);

    return (
        <div className="min-h-screen bg-Angler-Text-Grey">
            <div className="w-full h-full">
                <DataFetcher url={`http://0.0.0.0:8000/angler_core/app_cont?id=${params.app_id}`} setData={setData}/>
                app: {params.app_id}
            </div>
            <div>
                <DisplayPipeline data={data}/>
            </div>
        </div>)
}
