import React, { FC, FormEvent, useEffect, useState } from 'react';
import postData from "@/app/components/dataPost";
import dateConvert from "@/app/helpers/dateHelper";
import { CreateAppFormModalProps, MyDataCont } from "@/app/types";

export const CreateAppFormModal: React.FC<CreateAppFormModalProps> = ({ showModal, setShowModal, apps, setApps, groups }) => {
    const [appTitle, setAppTitle] = useState("");
    const [appDesc, setAppDesc] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleClickBackground: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if ((event.target as HTMLDivElement).id === 'background-modal') {
            if (setShowModal) {
                setShowModal(false);
            }
        }
    };

    const arr: any = groups.map(item => item.key);

    const [checkedState, setCheckedState] = useState(
        new Array(arr.length).fill(false)
    );

    useEffect(() => {
        const updatedArr = groups.map(item => item.key);
        setCheckedState(new Array(updatedArr.length).fill(false));
    }, [groups]);

    const handleOnChange = (position: any) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors: { [key: string]: string } = {};

        if (!appTitle) {
            valid = false;
            newErrors.appTitle = "App name is required.";
        }

        if (!appDesc) {
            valid = false;
            newErrors.appDesc = "Description is required.";
        }

        if (!checkedState.some(Boolean)) {
            valid = false;
            newErrors.groups = "At least one group must be selected.";
        }

        setErrors(newErrors);
        return valid;
    };

    const get_new_id = async (data: any) => {
        const r = await postData(data, 'http://127.0.0.1:8000/angler_core/api');

        data.app_id = r.app_id;
        data.date_last_modified = dateConvert(r.date_last_modified);
        return data;
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const filteredStrings: string[] = arr.filter((_: any, index: number) => {
            return checkedState[index];
        });

        const data: MyDataCont = {
            app_id: 0,
            app_name: appTitle,
            short_desc: appDesc,
            used_containers: filteredStrings.join(","),
            owner: "miha",
            date_last_modified: 0,
            edit: 0
        };

        let new_app = await get_new_id(data);

        setApps((nds: any[]) => nds.concat(new_app));
        setAppTitle("");
        setAppDesc("");

        // @ts-ignore
        setShowModal(false);
    }

    function AppTyped(e: React.ChangeEvent<HTMLInputElement>) {
        setAppTitle(e.target.value);
    }

    function DescTyped(e: React.ChangeEvent<HTMLInputElement>) {
        setAppDesc(e.target.value);
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
                        Create New App
                    </h1>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <div>
                            <label
                                htmlFor="app-name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                App Name
                            </label>
                            <input
                                id="app-name"
                                type="text"
                                value={appTitle}
                                onChange={AppTyped}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                                required
                            />
                            {errors.appTitle && <p className="text-red-500 text-sm mt-1">{errors.appTitle}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="app-desc"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <input
                                id="app-desc"
                                type="text"
                                value={appDesc}
                                onChange={DescTyped}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                                required
                            />
                            {errors.appDesc && <p className="text-red-500 text-sm mt-1">{errors.appDesc}</p>}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Choose Groups
                            </label>
                            {arr.slice().map((item: any, index: number) => (
                                <div key={index} className="items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`selectedCont-${index}`}
                                        name={item}
                                        onChange={() => handleOnChange(index)}
                                        value={item}
                                        className="h-4 w-4 px-1"
                                    />
                                    <label htmlFor={`selectedCont-${index}`} className="text-sm font-medium text-gray-700">
                                        {item}
                                    </label>
                                </div>
                            ))}
                            {errors.groups && <p className="text-red-500 text-sm mt-1">{errors.groups}</p>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
                            >
                                Create App
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default CreateAppFormModal;
