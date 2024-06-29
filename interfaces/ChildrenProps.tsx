import { ReactNode } from "react";

export interface ChildrenProps {
    children: ReactNode;
    onClick?: () => void; // Callback function for the click event
    className?: String;
    selectable?: boolean;
}