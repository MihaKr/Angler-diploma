import Image from "next/image";
import {MenuButton} from "@/app/components/MenuButton";
interface MenuButtonProps {
    setShowModal? : React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideMenu: React.FC<MenuButtonProps> = ({ setShowModal}) => {

    return (
        <div className="top-menu-container">
            <div className="flex justify-between items-center bg-side-menu_gray p-4 w-full">
                <div className="flex items-center gap-4"> {/* Flex container for logo and welcome text */}
                    <div className="logo-container bg-Angler-Dark_Blue flex justify-center items-center h-12 w-48">
                        <p className="text-white">APPLOGO</p>
                    </div>
                    <p className="text-Angler-Dark_Blue">Welcome to ANGLEr</p>
                </div>
                <div className="menu-buttons flex gap-4">
                    <MenuButton setShowModal={setShowModal} text={"New document"}/>
                    <MenuButton text={"Open document"}/>
                    <MenuButton text={"Recent files"}/>
                    <MenuButton text={"Tutorials document"}/>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
