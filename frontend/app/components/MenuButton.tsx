"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import postData from "@/app/components/dataPost";


interface MenuButtonProps {
    text: string
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
}

type MyData = {
    app_name: string;
    owner: string;
};

const jsonData: MyData = {
    app_name: "app_psot_next",
    owner: "miha"
};

const NewDoc = () => {
        //postData(jsonData)
};


export const MenuButton: React.FC<MenuButtonProps> = ({ text, setShowModal}) => {
    return (
        // @ts-ignore
        <a href="#" type="button" onClick={() => setShowModal(true)} className={"content-end inline-flex justify-between .flex-1 "}>
            <div className={`flex items-center justify-center`}>
                <p className={"hover:text-Angler-Dark_Blue text-Angler-Text-Grey flex items-center justify-center"}>
                    {text}
                </p>
            </div>
        </a>
    )
}