import {useEffect, useState} from "react";

const Cursor = () => {
    const [cursorVisible, setCursorVisible] = useState(false);
    useEffect(() => {
        setTimeout(function() {
            setCursorVisible(!cursorVisible);
        }, 500)
    }, [cursorVisible]);
    return (
        <div
            className={`h-6 w-2 bg-green-600 ${cursorVisible ? `opacity-1` : `opacity-0`}`}
        ></div>
    )
}
export default Cursor;