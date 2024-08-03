import { FC } from "react";
import {ChildrenProps} from "@/interfaces/ChildrenProps";

interface MenuLinkProps extends ChildrenProps {
    href?: string | false;
}

const MenuLink: FC<MenuLinkProps>  = props => {
    const {href = false, children, onClick, className='', selectable = true} = props;
    return (
        <a {...(href ? { href } : {})} target={'_blank'} className={`select-none border-transparent border-b-2 ${selectable && `cursor-pointer hover:border-white`} ${className}`} onClick={onClick}>
            {children}
        </a>
    )
}
export default MenuLink;