import React, {FC, FormEvent, MouseEventHandler, useState} from 'react';
import postData from "@/app/components/dataPost";
import dateConvert from "@/app/helpers/dateHelper";

interface CreateAppFormModalProps {
    showModal: boolean;
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
    apps: []
    setApps: React.Dispatch<React.SetStateAction<any[]>>;
}

type MyData = {
    app_id: number;
    app_name: string;
    owner: string;
    date_last_modified: any
};

export const CreateAppFormModal: React.FC<CreateAppFormModalProps> = ({ showModal, setShowModal, apps, setApps }) => {
    const [appTitle, setAppTitle] = useState("");

    const handleClickBackground: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if((event.target as HTMLDivElement).id == 'background-modal') {
            if (setShowModal) {
                setShowModal(false)
            }
        }
    };

    const get_new_id = async (data: any) => {
        const r = await postData(data,'http://127.0.0.1:8000/angler_core/api')

        data.app_id = r.app_id
        data.date_last_modified = dateConvert(r.date_last_modified)
        return data
    }


    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        //const formData = new FormData(event.currentTarget);

        //console.log(formData)

        const data: MyData = {
            app_id: 0,
            app_name: appTitle,
            owner: "miha",
            date_last_modified: 0
        };

        let new_app = await get_new_id(data)

        console.log(new_app)

        setApps((nds: any[]) => nds.concat(new_app));

        // @ts-ignore
        setShowModal(false);
    }

    function AppTyped(e: React.ChangeEvent<HTMLInputElement>) {
        setAppTitle(e.target.value);
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
                    className="bg-white p-6 rounded-lg shadow-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h1 className="text-center text-lg font-semibold text-gray-800 mb-4">
                        Create New App
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
                            onChange={AppTyped}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                        />
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
    )
        ;
};

export default CreateAppFormModal;
