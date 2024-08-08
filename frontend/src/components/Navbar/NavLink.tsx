import { Badge } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link, LinkProps } from "react-router-dom";

interface NavLinkProps extends LinkProps {
    onClick?: () => void,
    icon: IconType,
    label: string,
    count?: number
}

export function NavLink({to, icon: Icon, label, count, onClick}: NavLinkProps){
    return (
        <li className="group py-2 px-3 rounded-md hover:bg-gray-300">
            <Link to={to}  onClick={onClick} className=" flex items-center gap-2">
                <Icon />
                <span className="group-hover:font-semibold">{label}</span>
                {!!count && <Badge>{count}</Badge>}
            </Link>
        </li>
    )
}