'use client'

import {useRouter} from 'next/navigation'
import React, {useEffect, useState} from "react";
import SideMenu from "@/app/ui/SideMenu";
import CenterMenu from "@/app/ui/CenterMenu";
import DataFetcher from "@/app/components/datafetcher";
import DisplayPipeline from "@/app/ui/DisplayPipeline";
import DragableComponent from "@/app/components/DraggableComponent";
import AllContainers from "@/app/components/AllContainers";
import {number} from "prop-types";
import postData from "@/app/components/dataPost";
import {DragEndEvent} from "@dnd-kit/core";

// pages/index.tsx

interface AllContainersI {
    app_container_id: number;
    container_id: number;
    app_id: number;
    prev_container: number;
    next_container: number;
    position_x: number;
    position_y: number;
}

export default function Page({ params }: { params: { app_id: number } }) {
    const [activeContainers, setActiveContainers] = useState<any>([]);
    const [allContainers, setAllContainers] = useState<any>([]);

    const handleClickAllContainers = (e: DragEndEvent) => {
        if(activeContainers.length > 0) {
            const tmp_cont = [...activeContainers];
            let max = getMax(tmp_cont) + 1
            let new_cont = {
                "app_container_id": max, //max current +1,
                "container_id": +e.active.id,//e id,
                "app_id": +params.app_id, //convert to num
                "prev_container": null,
                "next_container": null,
                "position_x": e.delta.x,
                "position_y": e.delta.y
            }
            tmp_cont.push(new_cont)

            postData(new_cont, 'http://0.0.0.0:8000/angler_core/app_cont')

            setActiveContainers(tmp_cont)
        }
        else {
            let tmp_cont = [];
            let max = 0
            let new_cont = {
                "app_container_id": max, //max current +1,
                "container_id": +e.active,//e id,
                "app_id": +params.app_id, //convert to num
                "prev_container": null,
                "next_container": null,
                "position_x": +e.delta.x,
                "position_y": +e.delta.y
            }
            tmp_cont.push(new_cont)

            postData(new_cont, 'http://0.0.0.0:8000/angler_core/app_cont')

            setActiveContainers(tmp_cont)
        }
    }

    function getMax(arr: AllContainersI[]) {
        let max = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].app_container_id > max) {
                max = arr[i].app_container_id
            }
        }

        return max
    }

    //TODO dodaj en datafetch za vse containerje
    //TODO on drag naredi duplikat in dodaj v state - kot svoj component
    //TODO v backendu endpoint za vse containers

    return (
        <div className="min-h-screen bg-Angler-Text-Grey relative">
            <div className="w-full h-full">
                <DataFetcher url={`http://0.0.0.0:8000/angler_core/app_cont?id=${params.app_id}`} setData={setActiveContainers}/>
                <DataFetcher url={`http://0.0.0.0:8000/angler_core/all_cont`} setData={setAllContainers}/>
                app: {params.app_id}
            </div>
            <div>
                <AllContainers all_containers={allContainers} drag_func={handleClickAllContainers}/>
                <DisplayPipeline data={activeContainers} updateData={setActiveContainers}/>
            </div>
        </div>)
}
