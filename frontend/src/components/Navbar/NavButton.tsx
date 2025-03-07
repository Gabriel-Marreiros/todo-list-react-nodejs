import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface NavButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?(): void;
    icon: IconType;
    iconColor?: string;
    label: string;
}

export function NavButton({icon: Icon, iconColor, label, onClick }: NavButtonProps){
    return (
        <li className="group py-2 px-3 rounded-md hover:bg-gray-300">
            <button className=" flex items-center gap-2" onClick={onClick}>
                <Icon color={iconColor}/>
                <span className="text-sm text-black text-start group-hover:font-semibold">{label}</span>
            </button>
        </li>
    )
}