import { StringArray } from "@/interfaces";
import { FC, useEffect, useState, useCallback, useRef } from "react";
import { Cursor } from "@/components";

const TypeOut: FC<{
    strings: StringArray,
    firstLineCallback: () => void,
    finishedCallback: () => void,
    startProcess: {current:
        boolean
    },
    setSiteVisible: (value:boolean) => void,
    setHeadlinePrinted: (value:boolean) => void;
    setStartProcess: (value:boolean) => void;
}> = ({
        strings,
        firstLineCallback,
        finishedCallback,
        startProcess,
        setSiteVisible,
        setHeadlinePrinted,
        setStartProcess,
    }) => {
    const [stringContent, setStringContent] = useState<string>("");
    const [forceCursorVisible, setForceCursorVisible] = useState(true);
    const firstLineSent = useRef(false);
    const [processRunning, setProcessRunning] = useState(false);
    const [cursorActive, setCursorActive] = useState(false);

    const handleKeystroke = useCallback(() => {
        setForceCursorVisible(true);
        setTimeout(() => {
            setForceCursorVisible(false);
        }, 500);
    }, []);

    useEffect(() => {
        console.log('use effect fired', {strings: strings, processRunning: processRunning, startProcess: startProcess.current})
        console.log('start process: ', startProcess);
        console.log('strings: ', strings);

        if ( !startProcess || !strings.length || processRunning ) return; // Prevent re-running the typing process
        setProcessRunning(true);
        setStartProcess(false);
        setSiteVisible(false);
        setCursorActive(true);
        let currentIndex = 0;
        let currentStringIndex = 0;
        let currentStringContent = "";

        const typeCharacter = () => {
            if (currentStringIndex < strings.length) {
                const currentString = strings[currentStringIndex];
                if (currentIndex < currentString.length) {
                    currentStringContent += currentString[currentIndex];
                    setStringContent(currentStringContent);
                    handleKeystroke();
                    const delay =
                        currentString[currentIndex] === "." || currentString[currentIndex] === "!" || currentString[currentIndex] === "?"
                            ? 1000
                            : currentString[currentIndex] === ","
                                ? 250
                                : 20;
                    currentIndex++;
                    setTimeout(typeCharacter, delay);
                } else {
                    currentStringIndex++;
                    currentIndex = 0;
                    if (currentStringIndex < strings.length) {
                        currentStringContent += "\n\r\n\r"; // Add a line break for the next string
                    }

                    // Check and call firstLineCallback here
                    if (currentStringIndex === 1 && !firstLineSent.current) {
                        firstLineSent.current = true;
                        firstLineCallback();
                    }

                    setTimeout(typeCharacter, 1000); // Delay before starting the next string
                }
            } else {
                setTimeout(function(){
                    setTimeout(function(){
                        setCursorActive(false);
                    }, 1000);
                    finishedCallback();// Call finishedCallback when typing is done
                    setProcessRunning(false);
                    setHeadlinePrinted(true);
                }, 500);
            }
        };

        typeCharacter();
    }, [strings, handleKeystroke, finishedCallback, firstLineCallback, startProcess, processRunning, setSiteVisible, setHeadlinePrinted]);

    return (
        <div className="relative">
            <p className="inline m-0 whitespace-pre-wrap tracking-tight pt-8 select-none">{stringContent}</p>
            <Cursor forceCursorVisible={forceCursorVisible} active={cursorActive} className="inline-block align-middle absolute" />
        </div>
    );
};

export default TypeOut;
