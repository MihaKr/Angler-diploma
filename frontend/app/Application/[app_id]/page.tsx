'use client'

import React, {useEffect, useState} from "react";
import DataFetcher from "@/app/components/datafetcher";
import AllContainers from "@/app/components/AllContainers";
import postData from "@/app/components/dataPost";
import {DragEndEvent} from "@dnd-kit/core";
import NewDisplayPipeline from "@/app/ui/NewDisplayPipeline";
import {number} from "prop-types";
import datafetcher from "@/app/components/datafetcher";
import dataFetch from "@/app/components/dataFetch";
import RunAppButton from "@/app/components/RunAppButton";

// pages/index.tsx

interface AllContainersI {
    app_container_id: number;
    container_id: number;
    app_id: number;
    prev_container: number;
    next_container: number;
    position: { x: number, y: number }
}

export default function Page({ params }: { params: { app_id: number } }) {
    const [activeContainers, setActiveContainers] = useState<any>([]);
    const [allContainers, setAllContainers] = useState<any>([]);
    const [edges, setEdges] = useState<any>([]);


    const handleClickAllContainers = async (e: DragEndEvent) => {
        if(activeContainers.length > 0) {
            const tmp_cont = [...activeContainers];
            let new_cont = {
                "app_container_id": 0, //max current +1,
                "container_id": +e.active.id,//e id,
                "app_id": +params.app_id, //convert to num
                "prev_container": null,
                "next_container": null,
                "position": { "x": +e.delta.x, "y": +e.delta.y }
            }
            const r = await postData(new_cont, 'http://0.0.0.0:8000/angler_core/app_cont')
            new_cont.app_container_id = r.app_container_id
            tmp_cont.push(new_cont)

            setActiveContainers(tmp_cont)

        }

        else {
            let tmp_cont = [];
            let new_cont = {
                "app_container_id": 0,
                "container_id": +e.active.id,//e id,
                "app_id": +params.app_id, //convert to num
                "prev_container": null,
                "next_container": null,
                "position": { "x": +e.delta.x, "y": +e.delta.y }
            }

            const r = await postData(new_cont, 'http://0.0.0.0:8000/angler_core/app_cont')
            new_cont.app_container_id = r.app_container_id
            tmp_cont.push(new_cont)

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
        <div className="min-h-screen relative">
            <div className="w-full h-full">
                <DataFetcher url={`http://0.0.0.0:8000/angler_core/app_cont?id=${params.app_id}`}
                             setData={setActiveContainers}/>
                <DataFetcher url={`http://0.0.0.0:8000/angler_core/cont_link?id=${params.app_id}`}
                             setData={setEdges}/>
                <DataFetcher url={`http://0.0.0.0:8000/angler_core/all_cont`} setData={setAllContainers}/>

                app: {params.app_id}
            </div>
            <div className="grid grid-cols-5 min-h-screen">
                <div className="col-span-1 bg-gray-600 flex flex-col justify-between h-full">
                    <div>
                        <AllContainers all_containers={allContainers} drag_func={handleClickAllContainers}/>
                    </div>
                    <div className="flex-grow"></div>
                    <div>
                        <RunAppButton app_id={params.app_id}/>
                    </div>
                </div>
                <div className="col-span-4">
                    <NewDisplayPipeline data={activeContainers} updateData={setActiveContainers} edge_data={edges}
                                        update_edge={setEdges} app_id={params.app_id}/>
                </div>
            </div>

        </div>)
}
