import { StringArray } from "@/interfaces";
import { FC, useEffect, useState, useCallback, useRef } from "react";
import { Cursor } from "@/components";

const TypeOut: FC<{ strings: StringArray; firstLineCallback: () => void; finishedCallback: () => void }> = ({
                                                                                                                strings,
                                                                                                                firstLineCallback,
                                                                                                                finishedCallback,
                                                                                                            }) => {
    const [stringContent, setStringContent] = useState<string>("");
    const [forceCursorVisible, setForceCursorVisible] = useState(true);
    const firstLineSent = useRef(false);
    const processStarted = useRef(false);

    const handleKeystroke = useCallback(() => {
        setForceCursorVisible(true);
        setTimeout(() => {
            setForceCursorVisible(false);
        }, 500);
    }, []);

    useEffect(() => {
        if (processStarted.current) return; // Prevent re-running the typing process

        processStarted.current = true;
        let currentIndex = 0;
        let currentStringIndex = 0;
        let currentStringContent = "";

        const typeCharacter = () => {
            if (currentStringIndex < strings.strings.length) {
                const currentString = strings.strings[currentStringIndex];
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
                    if (currentStringIndex < strings.strings.length) {
                        currentStringContent += "\n\r\n\r"; // Add a line break for the next string
                    }

                    // Check and call firstLineCallback here
                    if (currentStringIndex === 1 && !firstLineSent.current) {
                        firstLineSent.current = true;
                        firstLineCallback();
                    }

                    setTimeout(typeCharacter, 2000); // Delay before starting the next string
                }
            } else {
                finishedCallback(); // Call finishedCallback when typing is done
            }
        };

        typeCharacter();
    }, [strings.strings, handleKeystroke, finishedCallback, firstLineCallback]);

    return (
        <div className="relative">
            <p className="inline m-0 whitespace-pre-wrap tracking-tight pt-8">{stringContent}</p>
            <Cursor forceCursorVisible={forceCursorVisible} className="inline-block align-middle absolute" />
        </div>
    );
};

export default TypeOut;
