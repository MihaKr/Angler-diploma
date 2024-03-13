// pages/index.tsx
'use client'

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SideMenu from "@/app/ui/SideMenu";
import CenterMenu from "@/app/ui/CenterMenu";
import CreateAppFormModal from "@/app/components/CreateAppFormModal";
import {useState} from "react";
//TODO: COMPONENT MODAL
export default function Index() {
    const [showModal, setShowModal] = useState(false);
    console.log(showModal)
    return (
        <div className="flex bg-white">
            <SideMenu setShowModal={setShowModal}/>
            <CenterMenu />
            <CreateAppFormModal showModal={showModal} setShowModal={setShowModal}/>
        </div>
    )
}
