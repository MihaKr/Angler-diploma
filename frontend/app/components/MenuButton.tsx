"use client"
import Image from "next/image";
import {useState} from "react";
import postData from "@/app/components/dataPost";


interface MenuButtonProps {
    text: string
}

export const MenuButton: React.FC<MenuButtonProps> = ({ text}) => {

    const NewDoc = () => {
        postData
    };

    return (
        <a href="#" onClick={NewDoc} className={"content-end inline-flex justify-between .flex-1 "}>
            <div className={` flex items-center justify-center`}>
                <p className={"hover:text-Angler-Dark_Blue text-Angler-Text-Grey flex items-center justify-center"}>
                    {text}
                </p>
            </div>
        </a>
    )
}