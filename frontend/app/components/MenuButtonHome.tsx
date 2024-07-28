"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import postData from "@/app/components/dataPost";
import {useRouter} from "next/navigation";
import {MenuButtonProps} from "@/app/types";

const RedirectToHome = () => {
    const router = useRouter();

    const redirectToHomePage = () => {
        router.push('/');
    };

    return (
        <button onClick={redirectToHomePage}>Go to Home</button>
    );
};


export const MenuButtonHome: React.FC<MenuButtonProps> = ({ text}) => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/');
    };

    return (
        <a href="#" type="button" onClick={handleRedirect} className={"content-end inline-flex justify-between .flex-1 "}>
            <div className={`flex items-center justify-center`}>
                <p className={"hover:text-Angler-Dark_Blue text-Angler-Text-Grey flex items-center justify-center"}>
                    {text}
                </p>
            </div>
        </a>
    );
};