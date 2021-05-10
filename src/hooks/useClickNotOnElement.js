import { useEffect, useState } from "react";

const useClickNotOnElement = (element) => {
    const [showElement, setShowElement] = useState(false);
    useEffect(() => {
        if (!showElement) return;
        const handleClick = (event) => {
            if (element.current && !element.current.contains(event.target)) {
                setShowElement(false);
            }
        };

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [element, showElement]);

    return [showElement, setShowElement];
};

export default useClickNotOnElement;
