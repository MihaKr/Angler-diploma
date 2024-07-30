// pages/index.tsx
'use client'

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SideMenu from "@/app/ui/SideMenu";
import CenterMenu from "@/app/ui/CenterMenu";
import CreateAppFormModal from "@/app/components/CreateAppFormModal";
import {useEffect, useState} from "react";
import Footer from "@/app/ui/Footer";
import TsContent from "@/app/components/tsContent";
import dataFetch from "@/app/components/dataFetch";
import toGroups from "@/app/helpers/toGroups";
import EditAppFormModal from "@/app/components/EditAppFormModal";
import {MyDataCont} from "@/app/types";


export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [apps, setApps] = useState<any>([]);
    const [allContainers, setAllContainers] = useState<any>([]);
    const [appValues, setAppValues] = useState<MyDataCont>({
        app_id: 0,
        app_name: "",
        date_last_modified: undefined,
        owner: "",
        short_desc: "",
        used_containers: ""
    });


    useEffect(() => {
        dataFetch(setAllContainers, `http://0.0.0.0:8000/angler_core/all_cont`)
    }, []);
    const x = toGroups(allContainers)

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-100">
            <SideMenu setShowModal={setShowModal}/>
            <CenterMenu apps={apps} showModal={showEditModal} setShowModal={setShowEditModal}  setApps={setApps} appValues={appValues} setAppValues={setAppValues}/>
            <CreateAppFormModal showModal={showModal} setShowModal={setShowModal} apps={apps} setApps={setApps} groups={x}/>
            <EditAppFormModal showModal={showEditModal} setShowModal={setShowEditModal} apps={apps} setApps={setApps} groups={x} appValues={appValues} setAppValues={setAppValues}/>
            <Footer />
        </div>
    )
}


/*
            <SideMenu setShowModal={setShowModal}/>
            <CenterMenu />
            <CreateAppFormModal showModal={showModal} setShowModal={setShowModal}/>

                        <ReactFlowProvider initialNodes={initialNodes} initialEdges={initialEdges}>
                <MiniMap zoomable pannable />
                <Controls />
                <Background color="#aaa" gap={16} />
                <Flow nodes={nodes} edges={edges} />
            </ReactFlowProvider>
 */