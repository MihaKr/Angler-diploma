import React, {FC} from 'react';
import dataPost from "@/app/components/dataPost";

interface ContainerButtonProps {
    app_id: number
}
const RunAppButton: FC<ContainerButtonProps> = ({ app_id }) => {
    const onClickRunHandler = () => {
        let f = {
            "app_id": app_id
        }
        dataPost(f, 'http://127.0.0.1:8000/angler_core/run_app')
    }

    return (
        <div>
            <button className="bg-Angler-Button_Blue hover:bg-blue-700 rounded-2xl p-4"
                    onClick={onClickRunHandler}>
                Run App
            </button>
        </div>
    );
}

export default RunAppButton
