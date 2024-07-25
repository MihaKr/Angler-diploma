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
        <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between w-full">
                <a href="#" onClick={toggleExpand} className="flex items-center justify-between w-full">
                    <p className="text-dark-purple p-5 hover:text-blue-800 cursor-pointer">{group_name}</p>
                    {isExpanded ?
                        <MinusIcon className="w-6 h-6 text-blue-500"/> :
                        <PlusIcon className="w-6 h-6 text-blue-500"/>}
                </a>
            </div>
            {isExpanded && (
                <div>
                    <AllContainers all_containers={allContainers} drag_func={handleClickAllContainers}/>
                </div>
            )}
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
