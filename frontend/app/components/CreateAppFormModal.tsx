import React, {FC, FormEvent, useState} from 'react';

const CreateAppFormModal = () => {
    const [appTitle, setAppTitle] = useState("")

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: formData,
        })
    }

    function AppTyped(e: { target: { value: React.SetStateAction<string>; }; }) {
        setAppTitle(e.target.value)
    }

    return (
        <div>
            <div className="block text-Angler-Dark_Blue font-bold text-center md:mb-0 pr-4 pb-4 pt-4">
                <h1>Create New App</h1>
            </div>
            <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Application Title
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input
                            className="side-menu_gray appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="inline-full-name" type="text" value= {appTitle} onChange={AppTyped}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button
                            className="shadow bg-Angler-Dark_Blue hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button">
                            Create App
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateAppFormModal;
/*

<div className="w-full max-w-xs">
    <form onSubmit={onSubmit}>
        <label className={"text-Angler-Text-Grey"} htmlFor="AppName">App Title:</label>
        <input type="text" name="AppName" className={"text-Angler-Text-Grey"}/>
        <button className={"text-Angler-Text-Grey"} type="submit">Submit</button>
    </form>
</div>*/