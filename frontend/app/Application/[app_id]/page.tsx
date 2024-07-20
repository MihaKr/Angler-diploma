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
import {number} from "prop-types";
import allContainers from "@/app/components/AllContainers";
import dataFetch from "@/app/components/dataFetch";
import Status from "@/app/components/Status";
import WebSocketComponent from "@/app/components/WebSocketComponent";

// pages/index.tsx

interface AllContainersI {
    app_container_id: number;
    container_id: number;
    app_id: number;
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
    const [successMessage, setSuccessMessage] = useState<any>('');
    const [check, setCheck] = useState<any>('');

    useEffect(() => {
        const updateActiveContainers = () => {
            const updatedActiveContainers = activeContainers.map((data: allContainers) => {
                const matchingContainer = allContainers.find((container: Container) =>
                    Number(container.container_id) === Number(data.container_id)
                );
                if (matchingContainer) {
                    return {
                        ...data,
                        container_name: `${matchingContainer.container_name}` // Example mapping function
                    };
                }
                console.log("data")
                console.log(data)
                return data;
            });
            setActiveContainers(updatedActiveContainers);
        };
        updateActiveContainers();
        console.log(activeContainers)
    }, [allContainers]);


    let groups = createGroupDict(allContainers)


    //TODO dodaj en datafetch za vse containerje
    //TODO on drag naredi duplikat in dodaj v state - kot svoj component
    //TODO v backendu endpoint za vse containers

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <AddNewContainerModal
                showModal={showModalNewContainer}
                setShowModal={setShowModalNewContainer}
                allContainers={allContainers}
                setAllContainers={setAllContainers}
                setSuccessMessage={setSuccessMessage}
                successMessage={setSuccessMessage}
            />
            <div className="max-w">
                <SideMenu setShowModal={setShowModal}/>
            </div>
            <div>
                <DataFetcher
                    url={`http://0.0.0.0:8000/angler_core/app_cont?id=${params.app_id}`}
                    setData={setActiveContainers}
                />
                <DataFetcher
                    url={`http://0.0.0.0:8000/angler_core/cont_link?id=${params.app_id}`}
                    setData={setEdges}
                />
                <DataFetcher url={`http://0.0.0.0:8000/angler_core/all_cont`} setData={setAllContainers}/>
            </div>
            <div className="grid grid-cols-5 flex-1 overflow-hidden">
                <div className="bg-white shadow-md rounded-lg p-4 w-full">
                    {groups.map((container: GroupedContainers, index: number) => (
                        <div key={container.key} className="p-2">
                            <DropDown
                                group_name={container.key}
                                allContainers={container.items}
                                setAllContainers={setAllContainers}
                            />
                        </div>
                    ))}
                    <div className="mt-8">
                        <a
                            href="#"
                            type="button"
                            onClick={() => setShowModalNewContainer(true)}
                            className="flex z-20"
                        >
                            <div
                                className={`flex items-center justify-center w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 z-50`}
                            >
                                <p>{"Add New Container"}</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-span-3">
                    <NewDisplayPipeline
                        data={activeContainers}
                        updateData={setActiveContainers}
                        edge_data={edges}
                        update_edge={setEdges}
                        app_id={params.app_id}
                        setShowModal={setshowConfigMenuModal}
                        setConfFile={setContConfigId}
                        setApp_cont_id={setApp_cont_id}
                        app_cont_id={app_cont_id}
                        conf_file={contConfigId}
                        allCont={allContainers}
                    />
                </div>
                <div className="z-40 h-min w-min inline-block p-4">
                    <TsContent
                        showModal={showConfigMenuModal}
                        setShowModal={setshowConfigMenuModal}
                        contArgs={contArgs}
                        setcontArgs={setcontArgs}
                        app_cont_id={app_cont_id}
                        setApp_cont_id={setApp_cont_id}
                        setConfFile={setContConfigId}
                        conf_file={contConfigId}
                    />
                    <div className="z-30 inline-block w-[90%] whitespace-nowrap">
                        <RunAppButton
                            app_id={params.app_id}
                            successMessage={successMessage}
                            setSuccessMessage={setSuccessMessage}
                        />
                    </div>
                    {successMessage !== '' && (
                        <div className="mt-4 text-green-600 text-center">{successMessage}</div>
                    )}
                </div>
            </div>
            <div className="fixed inset-x-0 bottom-0 min-h-[20%] max-h-[20%] overflow-y-auto rounded-2xl p-4">
                <div>Debug Log</div>
                <WebSocketComponent check={successMessage}/>
            </div>
        </div>

    )
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

