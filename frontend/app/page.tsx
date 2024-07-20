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


//TODO: COMPONENT MODAL
export default function Index() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-100">
            <SideMenu setShowModal={setShowModal}/>
            <CenterMenu />
            <CreateAppFormModal showModal={showModal} setShowModal={setShowModal}/>
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