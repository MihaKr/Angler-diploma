"use client"
import { useRouter } from 'next/navigation'
import stock from "../../public/stock.jpg";
import Image from 'next/image'
import dateConvert from "@/app/helpers/dateHelper";
import {AppSelectionButtonProps} from "@/app/types";
import deleteData from "@/app/components/dataDelete";
import dataFetch from "@/app/components/dataFetch";

export const ApplicationButton: React.FC<AppSelectionButtonProps> = ({ text, app_id, date_last_modified, description, data, setData, setShowModal, setAppValues,appValues}) => {

    const click = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        router.push(`/Application/${app_id}`);
    };

    const clickEdit = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        dataFetch(setAppValues, `http://127.0.0.1:8000/angler_core/api?id=${app_id}`)
        setShowModal(true)
    };

    const clickDelete = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        let result = confirm("Want to delete?");
        if (result) {
            deleteData({},`http://127.0.0.1:8000/angler_core/api?id=${app_id}`)
            setData(data.filter((item: any) => item.app_id !== app_id))
        }
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
            <div className="flex justify-center space-x-4">
                <button
                    className="flex-1 p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 z-50"
                    onClick={clickEdit}>
                    Edit
                </button>
                <button
                    className="flex-1 p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 z-50"
                    onClick={clickDelete}>
                    Delete
                </button>
            </div>
        </div>
    )
}