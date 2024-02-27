"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import postData from "@/app/components/dataPost";


interface MenuButtonProps {
    text: string
}

type MyData = {
    app_name: string;
    owner: string;
    // Add more properties as needed
};

// Example usage:
const jsonData: MyData = {
    app_name: "app_psot_next",
    owner: "miha"

    // Add more properties as needed
};

const NewDoc = () => {
        postData(jsonData)
};


export const MenuButton: React.FC<MenuButtonProps> = ({ text}) => {
    return (
        <a href="#" type="button" onClick={NewDoc} className={"content-end inline-flex justify-between .flex-1 "}>
            <div className={` flex items-center justify-center`}>
                <p className={"hover:text-Angler-Dark_Blue text-Angler-Text-Grey flex items-center justify-center"}>
                    {text}
                </p>
            </div>
        </a>
    )
}