import {StringArray} from "@/interfaces";
import {FC, useEffect, useState, useCallback} from 'react';
import {Cursor} from "@/components";

const TypeOut: FC<{ strings: StringArray }> = ({strings}) => {
const [stringContent, setStringContent] = useState<Array<string>>([]);
const [forceCursorVisible, setForceCursorVisible] = useState(true);

    const handleKeystroke = useCallback(() => {
        setForceCursorVisible(true);
        setTimeout(() => {
            setForceCursorVisible(false);
        }, 500);
    }, []);

    useEffect(() => {
        let currentIndex = 0;
        let currentStringIndex = 0;
        let currentStringContent: string[] = [];

        const typeCharacter = () => {
            if (currentStringIndex < strings.strings.length) {
                const currentString = strings.strings[currentStringIndex];
                if (currentIndex < currentString.length) {
                    currentStringContent[currentStringIndex] = (currentStringContent[currentStringIndex] || "") + currentString[currentIndex];
                    setStringContent([...currentStringContent]);
                    handleKeystroke();
                    const delay = currentString[currentIndex] === '.' || currentString[currentIndex] === '!' || currentString[currentIndex] === '?' ? 1000 : currentString[currentIndex] === ',' ? 250 : 20; // 1 second delay for periods, 0.5 second for commas, 0.02 second for others
// 0.5 second delay for periods, 0.1 second for others
                    currentIndex++;
                    setTimeout(typeCharacter, delay);
                } else {
                    currentStringIndex++;
                    currentIndex = 0;
                    if (currentStringIndex < strings.strings.length) {
                        currentStringContent[currentStringIndex] = ""; // Initialize the next line
                    }
                    setTimeout(typeCharacter, 2000); // Delay before starting the next string
                }
            }
        };

        typeCharacter();
    }, [strings.strings, handleKeystroke]);

    return (
        <div className="flex flex-col">
            {stringContent.map((str, index) => (
                <div className="flex items-center" key={index}>
                    <p className="inline m-0 tracking-tight">{str}</p>
                    {index === stringContent.length - 1 && <Cursor forceCursorVisible={forceCursorVisible} className="inline-block align-middle"/>}
                </div>
            ))}
        </div>
    )
}
export default TypeOut;