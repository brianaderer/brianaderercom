import { FC } from "react";
import {ChildrenProps} from "@/interfaces/ChildrenProps";

interface MenuLinkProps extends ChildrenProps {
    href?: string | false;
}

const MenuLink: FC<MenuLinkProps>  = props => {
    const {href = false, children, onClick, className='', selectable = true} = props;
    return (
        <a {...(href ? { href } : {})} className={`select-none ${selectable && `cursor-pointer`} ${className}`} onClick={onClick}>
            {children}
        </a>
    )
}
export default MenuLink;