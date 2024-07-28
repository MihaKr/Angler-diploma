"use client"
import { useRouter } from 'next/navigation'
import stock from "../../public/stock.jpg";
import Image from 'next/image'
import dateConvert from "@/app/helpers/dateHelper";
import {AppSelectionButtonProps} from "@/app/types";

export const ApplicationButton: React.FC<AppSelectionButtonProps> = ({ text, app_id, date_last_modified, description}) => {

    const click = () => {
        router.push(`/Application/${app_id}`);
    };

    dateConvert(date_last_modified)


    const router = useRouter()

    return (
        <div className="bg-white hover:bg-gray-100 hover:cursor-pointer rounded-lg shadow-lg p-4 max-w-sm"
             onClick={click}
        >
            <Image src={stock} alt="a placeholder pic" width={350} height={350} className="rounded-t-lg w-full"/>

            <div className="p-4">
                <h5 className="text-lg font-bold pb-2"> {text}</h5>
                <p className="text-gray-500 text-xs pb-2">Description: {description}</p>
                <p className="text-gray-500 text-xs">Last change: {dateConvert(date_last_modified)}</p>
            </div>
        </div>
    )
}