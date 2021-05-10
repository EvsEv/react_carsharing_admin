import React, { useEffect, useRef, useState } from "react";
import useClickNotOnElement from "../../../hooks/useClickNotOnElement";

import styles from "./searchDropdown.module.sass";

// Temporary array of dropdown variants
const variants = [
    { name: "Первый вариант" },
    { name: "Второй вариант" },
    { name: "Третий вариант" },
    { name: "Четвертый вариант" },
    { name: "6 вариант" },
    { name: "7 вариант" },
    { name: "8 вариант" },
    { name: "9 вариант" },
    { name: "Test" },
    { name: "Testing" },
    { name: "Varios test suggestion" },
    { name: "77 вариант тестовый" },
];

export const SearchDropdown = ({ label, placeholder }) => {
    const [value, setValue] = useState("");
    const [isErrorExists, setIsErrorExists] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const dropdown = useRef();
    const [showDropdown, setShowDropdown] = useClickNotOnElement(dropdown);

    const inputClasses = [styles.input];

    if (isErrorExists) {
        inputClasses.push(styles.error);
    }

    useEffect(() => {
        setSuggestions(variants);
    }, []);

    const onType = (event) => {
        setShowDropdown(true);
        setValue(event.target.value);
        const updatedSuggestions = variants.filter(
            (variant) =>
                variant.name
                    .toLowerCase()
                    .search(event.target.value.toLowerCase()) !== -1
        );
        updatedSuggestions.length
            ? setIsErrorExists(false)
            : setIsErrorExists(true);
        setSuggestions(updatedSuggestions);
    };

    const onInputClick = () => setShowDropdown(true);

    const onSuggestionClick = (suggestion) => {
        setValue(suggestion);
        setShowDropdown(false);
    };

    return (
        <div className={styles.searchDropdown}>
            <label htmlFor={label} className={styles.label}>
                {label}
            </label>
            <div className={styles.inputField}>
                <input
                    className={inputClasses.join(" ")}
                    onChange={onType}
                    value={value}
                    onClick={onInputClick}
                    placeholder={placeholder}
                />
                {isErrorExists && (
                    <span className={styles.errorType}>
                        Нет подходящих вариантов
                    </span>
                )}
                {showDropdown && (
                    <ul className={styles.suggestion} ref={dropdown}>
                        {suggestions.map((suggestion) => (
                            <li
                                className={styles.item}
                                key={suggestion.name}
                                onClick={() =>
                                    onSuggestionClick(suggestion.name)
                                }
                            >
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
