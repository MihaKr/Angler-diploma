'use client'

import React, {useEffect, useState} from "react";
import DataFetcher from "@/app/components/datafetcher";
import postData from "@/app/components/dataPost";
import {DragEndEvent} from "@dnd-kit/core";
import NewDisplayPipeline from "@/app/ui/NewDisplayPipeline";
import RunAppButton from "@/app/components/RunAppButton";
import SideMenu from "@/app/ui/SideMenu";
import DropDown from "@/app/ui/DropDown";
import createGroupDict from "@/app/helpers/toGroups";
import ContainerButton from "@/app/components/ContainerButton";
import AddNewContainerModal from "@/app/components/AddNewContainerModal";
import TsContent from "@/app/components/tsContent";

// pages/index.tsx

interface AllContainersI {
    app_container_id: number;
    container_id: number;
    app_id: number;
    prev_container: number;
    next_container: number;
    position: { x: number, y: number }
}

interface Container {
    container_id: string
    container_name: string
    container_group: any
}

interface GroupedContainers {
    key: string;
    items: Container[];
}

interface ArgObj {
    [key: number]: { args: string };
}

export default function Page({ params }: { params: { app_id: number} }) {
    const [activeContainers, setActiveContainers] = useState<any>([]);
    const [allContainers, setAllContainers] = useState<any>([]);
    const [edges, setEdges] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalNewContainer, setShowModalNewContainer] = useState(false);
    const [showConfigMenuModal, setshowConfigMenuModal] = useState(false);
    const [contArgs, setcontArgs] = useState<ArgObj>({});
    const [app_cont_id, setApp_cont_id] = useState('');
    const [contConfigId, setContConfigId] = useState('');

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

    let groups = createGroupDict(allContainers)


    //TODO dodaj en datafetch za vse containerje
    //TODO on drag naredi duplikat in dodaj v state - kot svoj component
    //TODO v backendu endpoint za vse containers

    return (
        <div className="min-h-screen relative">
            <AddNewContainerModal showModal={showModalNewContainer} setShowModal={setShowModalNewContainer}/>

            <div>
                <SideMenu setShowModal={setShowModal}/>
            </div>
            <div className="w-full h-full">
                <DataFetcher url={`http://0.0.0.0:8000/angler_core/app_cont?id=${params.app_id}`}
                             setData={setActiveContainers}/>
                <DataFetcher url={`http://0.0.0.0:8000/angler_core/cont_link?id=${params.app_id}`}
                             setData={setEdges}/>
                <DataFetcher url={`http://0.0.0.0:8000/angler_core/all_cont`} setData={setAllContainers}/>

            </div>
            <div className="grid grid-cols-5 min-h-screen">
                <div className="bg-white shadow-md rounded-lg p-4">
                    {groups.map((container: GroupedContainers, index: number) => (
                        <div key={container.key} className="">
                            <DropDown group_name={container.key} allContainers={container.items}
                                      setAllContainers={setAllContainers}
                                      handleClickAllContainers={handleClickAllContainers}/>
                        </div>
                    ))}
                    <div>
                        <a href="#" type="button" onClick={() => setShowModalNewContainer(true)}
                           className={"content-end inline-flex justify-between .flex-1 "}>
                            <div className={`flex items-center justify-center`}>
                                <p className={"hover:text-Angler-Dark_Blue text-Angler-Text-Grey flex items-center justify-center"}>
                                    {"Add New Container"}
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-span-3">
                    <NewDisplayPipeline data={activeContainers} updateData={setActiveContainers} edge_data={edges}
                                        update_edge={setEdges} app_id={params.app_id} setShowModal={setshowConfigMenuModal}
                                        setConfFile={setContConfigId} setApp_cont_id={setApp_cont_id} app_cont_id={app_cont_id} conf_file={contConfigId}/>
                </div>
                <div className="z-40">
                    <TsContent showModal={showConfigMenuModal} setShowModal={setshowConfigMenuModal} contArgs={contArgs} setcontArgs={setcontArgs}
                               app_cont_id={app_cont_id} setApp_cont_id={setApp_cont_id} setConfFile={setContConfigId} conf_file={contConfigId}/>
                    <div>
                        <RunAppButton app_id={params.app_id}/>
                    </div>
                </div>

            </div>

        </div>)
}

/*
*                    <div>
                        <AllContainers all_containers={allContainers} drag_func={handleClickAllContainers}/>
                    </div>
                    <div className="flex-grow"></div>
                    <div>
                        <RunAppButton app_id={params.app_id}/>
                    </div>
                    *
                    * `http://0.0.0.0:8000/angler_core/app_cont?id=${conf_file}`, setPageName
* */
//<DropDown allContainers={allContainers} setAllContainers={setAllContainers} handleClickAllContainers={handleClickAllContainers}/>

