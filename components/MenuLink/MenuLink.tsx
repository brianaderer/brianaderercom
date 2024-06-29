import { FC } from "react";
import {ChildrenProps} from "@/interfaces/ChildrenProps";

const MenuLink: FC<ChildrenProps>  = props => {
    const {children, onClick, className='', selectable = true} = props;
    return (
        <a className={`select-none border-transparent border-b-2 ${selectable && `cursor-pointer hover:border-white`} ${className}`} onClick={onClick}>
            {children}
        </a>
    )
}
export default MenuLink;