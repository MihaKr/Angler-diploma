import Image from "next/image";
import {MenuButton} from "@/app/components/MenuButton";
interface MenuButtonProps {
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideMenu: React.FC<MenuButtonProps> = ({ setShowModal}) => {

    return (
        <div className="flex justify-start h-screen"> {/* Change justify-end to justify-start */}
            <div className="bg-side-menu_gray p-8 max-h-full">
                <div className="bg-Angler-Dark_Blue w-full flex justify-center items-center">
                    <p className="text-white">APPLOGO</p>
                </div>
                <p className="text-Angler-Dark_Blue">Welcome to ANGLEr</p>
                <div className="flex flex-col gap-2">
                    <MenuButton setShowModal={setShowModal} text={"New document"} />
                    <MenuButton text={"Open document"}/>
                    <MenuButton text={"Recent files"}/>
                    <MenuButton text={"Tutorials document"}/>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
