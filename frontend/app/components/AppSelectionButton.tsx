"use client"
import { useRouter } from 'next/navigation'

interface AppSelectionButtonProps {
    text: string
    app_id: Number

}

export const ApplicationButton: React.FC<AppSelectionButtonProps> = ({ text, app_id}) => {

    const click = () => {
        router.push(`/Application/${app_id}`);
    };

    const router = useRouter()


    return (
            <div className={`flex items-center justify-center`}>
                <button type="button" onClick={click} >
                    {text}
                </button>
            </div>
    )
}