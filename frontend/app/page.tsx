// pages/index.tsx
'use client'

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SideMenu from "@/app/ui/SideMenu";
import CenterMenu from "@/app/ui/CenterMenu";

export default function Index() {
    return (
        <div className="flex bg-white">
            <SideMenu />
            <CenterMenu />
        </div>
    )

}
