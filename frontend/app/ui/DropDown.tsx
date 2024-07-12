import Image from "next/image";
import {MenuButton} from "@/app/components/MenuButton";
import React, {useState} from "react";
import AllContainers from "@/app/components/AllContainers";

import { PlusIcon } from '@heroicons/react/24/solid'
import { MinusIcon } from "@heroicons/react/24/solid";

interface Container {
    container_id: string
    container_name: string
    container_group: any
}


interface DropDownProps {
    allContainers: Container[];
    setAllContainers? : React.Dispatch<React.SetStateAction<[]>>;
    handleClickAllContainers?: any
    group_name:string
}

export const DropDown: React.FC<DropDownProps> = ({ allContainers, setAllContainers, handleClickAllContainers, group_name}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={"flex-col justify-between items-center"}>
            <div className={"inline-flex items-center justify-center"}>
                <a href="#" onClick={toggleExpand} className={"content-end items-center inline-flex justify-between .flex-1"}>
                    <p className={`text-dark-purple p-5 hover:text-Angler-Dark_Blue hover:cursor-pointer`}>{group_name}</p>
                    {isExpanded ?
                        <MinusIcon className="size-6 text-blue-500"/>:
                        <PlusIcon className="size-6 text-blue-500"/>}
                </a>
            </div>
            <div>
                {isExpanded ? <div>
                        <AllContainers all_containers={allContainers} drag_func={handleClickAllContainers}/>
                </div> :
                    <div></div>}
            </div>
        </div>
    );
}

export default DropDown;

/*                    <div>
                        <AllContainers all_containers={allContainers} drag_func={handleClickAllContainers}/>
                    </div>
                    <div className="flex-grow"></div>
                    <div>
                        <RunAppButton app_id={params.app_id}/>
                    </div>*/
