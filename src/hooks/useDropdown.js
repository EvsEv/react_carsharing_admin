import { useEffect, useState } from "react";

const useDropdown = (dropdown) => {
    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(() => {
        if (!showDropdown) return;
        const handleClick = (event) => {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [dropdown, showDropdown]);

    return [showDropdown, setShowDropdown];
};

export default useDropdown;
