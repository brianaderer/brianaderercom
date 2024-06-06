import { useEffect, useState, FC } from "react";

const Cursor: FC<{ className: string, forceCursorVisible: boolean }> = ({ className, forceCursorVisible }) => {
    const [cursorVisible, setCursorVisible] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (forceCursorVisible) {
            setCursorVisible(true);
            // @ts-ignore
            clearTimeout(timeoutId);
        } else {
            timeoutId = setTimeout(() => {
                setCursorVisible(prevVisible => !prevVisible);
            }, 500);
        }

        return () => clearTimeout(timeoutId);
    }, [cursorVisible, forceCursorVisible]);

    return (
        <div
            className={`inline-block h-6 w-2 bg-green-600 ml-2 ${cursorVisible ? `opacity-1` : `opacity-0`} ${className}`}
        ></div>
    );
}

export default Cursor;
