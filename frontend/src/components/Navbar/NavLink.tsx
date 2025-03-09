import { Badge } from "@chakra-ui/react";
import { CSSProperties } from "react";
import { IconType } from "react-icons";
import { NavLink as RoterDomNavLink, LinkProps } from "react-router-dom";

interface NavLinkProps extends LinkProps {
    onClick?: () => void,
    icon: IconType,
    label: string,
    count?: number
}

export function NavLink({to, icon: Icon, label, count, onClick}: NavLinkProps){

    const navLinkActiveStyle: CSSProperties = {
        backgroundColor: "#d1d5db"
    };

    return (
        <li>
            <RoterDomNavLink to={to} onClick={onClick} className="group block py-2 px-3 rounded-md hover:bg-gray-300" style={({isActive}) => isActive ? navLinkActiveStyle : undefined}>
                <div className="flex items-center gap-2">
                    <Icon />
                    <span className="text-sm group-hover:font-semibold group-[.active]:font-semibold text-black">{label}</span>
                    {!!count && <Badge>{count}</Badge>}
                </div>
            </RoterDomNavLink>
        </li>
    )
}