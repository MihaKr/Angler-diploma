import React, { FC, FormEvent, useEffect, useState } from 'react';
import postData from "@/app/components/dataPost";
import dateConvert from "@/app/helpers/dateHelper";
import { EditAppFormModalProps, MyDataCont } from "@/app/types";
import dataPut from "@/app/components/dataPut";

export const CreateAppFormModal: React.FC<EditAppFormModalProps> = ({ showModal, setShowModal, apps, setApps, groups, appValues , setAppValues }) => {
    const [appTitle, setAppTitle] = useState("");
    const [appDesc, setAppDesc] = useState("");
    const [checkedState, setCheckedState] = useState<boolean[]>([]);

    const handleClickBackground: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if((event.target as HTMLDivElement).id === 'background-modal') {
            if (setShowModal) {
                setShowModal(false);
            }
        }
    };

    useEffect(() => {
        const arr = groups.map(item => item.key);
        const gr = appValues.used_containers.split(",");
        const newCheckedState = arr.map(item => gr.indexOf(item) > -1);
        setCheckedState(newCheckedState);
        setAppTitle(appValues.app_name);
        setAppDesc(appValues.short_desc);
    }, [appValues, groups]);

    const handleOnChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const get_new_id = async (data: any) => {
        const r = await postData(data, 'http://127.0.0.1:8000/angler_core/api');
        data.app_id = r.app_id;
        data.date_last_modified = dateConvert(r.date_last_modified);
        return data;
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const arr = groups.map(item => item.key);
        const filteredStrings: string[] = arr.filter((_, index) => checkedState[index]);

        const data: MyDataCont = {
            app_id: appValues.app_id,
            app_name: appTitle,
            short_desc: appDesc,
            used_containers: filteredStrings.join(","),
            owner: "miha",
            date_last_modified: appValues.date_last_modified,
            edit:1
        };

        await dataPut(data, `http://127.0.0.1:8000/angler_core/api?id=${appValues.app_id}`);
        //edit the app that was edited in the props and set the state valeu to inclide it

        data.date_last_modified = dateConvert(data.date_last_modified);

        const newApps = apps.map((item: any) => {
            if (item.app_id === appValues.app_id) {
                return data;
            }
            return item;
        });
        setApps(newApps);

        if (setShowModal) {
            setShowModal(false);
        }
    }

    return (
        <dialog open={showModal} className="modal z-50">
            <div
                id="background-modal"
                className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
                onClick={handleClickBackground}
            >
                <div
                    id="form-modal"
                    className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h1 className="text-center text-lg font-semibold text-gray-800 mb-4">
                        Edit App Settings
                    </h1>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <div>
                            <label
                                htmlFor="container-name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                App Name
                            </label>
                            <input
                                id="container-name"
                                type="text"
                                value={appTitle}
                                onChange={(e) => setAppTitle(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="container-desc"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <input
                                id="container-desc"
                                type="text"
                                value={appDesc}
                                onChange={(e) => setAppDesc(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Choose Groups
                            </label>
                            {groups.map((item, index) => (
                                <div key={index} className="items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="selectedCont"
                                        name={item.key}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                        value={item.key}
                                        className="h-4 w-4 px-1"
                                    />
                                    <label className="text-sm font-medium text-gray-700">
                                        {item.key}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
                            >
                                Save Values
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default CreateAppFormModal;
