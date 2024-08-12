"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import postData from "@/app/components/dataPost";
import {MenuButtonProps} from "@/app/types";

export const PluginButton: React.FC<MenuButtonProps> = ({ text, setShowModalContCreate}) => {
    return (
        // @ts-ignore
        <a href="#" type="button" onClick={() => setShowModalContCreate(true)} className={"content-end inline-flex justify-between .flex-1 "}>
            <div className={`flex items-center justify-center`}>
                <p className={"hover:text-Angler-Dark_Blue text-Angler-Text-Grey flex items-center justify-center"}>
                    {text}
                </p>
            </div>
        </a>
    )
}