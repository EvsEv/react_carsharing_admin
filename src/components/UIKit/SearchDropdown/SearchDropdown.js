import React, { useEffect, useRef, useState } from "react";
import useClickNotOnElement from "../../../hooks/useClickNotOnElement";

import styles from "./searchDropdown.module.sass";

export const SearchDropdown = ({
    variants,
    label,
    placeholder,
    selectedValue,
    changeValue,
    parameter,
    type,
}) => {
    const [value, setValue] = useState(selectedValue);
    const [error, setError] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const dropdown = useRef();
    const [showDropdown, setShowDropdown] = useClickNotOnElement(dropdown);

    const inputClasses = [styles.input];

    const searchDropdownClasses = [styles.searchDropdown];

    if (type) {
        searchDropdownClasses.push(styles[type]);
    }

    if (error) {
        inputClasses.push(styles.error);
    }

    useEffect(() => {
        setSuggestions(variants);
    }, []);

    useEffect(() => {
        selectedValue && setValue(selectedValue);
    }, [selectedValue]);

    const onType = (event) => {
        setShowDropdown(true);
        setValue(event.target.value);
        const updatedSuggestions = variants.filter(
            (variant) =>
                variant.name
                    .toLowerCase()
                    .search(event.target.value.toLowerCase()) !== -1
        );
        if (
            updatedSuggestions.find(
                (suggestion) => suggestion.name === event.target.value
            )
        ) {
            setError(false);
            changeValue(event.target.value);
            setSuggestions(variants);
            setShowDropdown(false);
        } else {
            changeValue("");
            setError("Неверное значение");
        }

        if (!event.target.value) {
            changeValue("");
            setError("Выберите значение");
        }
        setSuggestions(updatedSuggestions);
    };

    const onInputClick = () => {
        if (selectedValue) {
            setSuggestions(variants);
        }
        setShowDropdown(true);
    };

    const onSuggestionClick = (suggestion) => {
        changeValue(suggestion);
        setValue(suggestion);
        setError(false);
        setSuggestions(variants);
        setShowDropdown(false);
    };

    return (
        <div className={searchDropdownClasses.join(" ")}>
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
                    name={parameter}
                />
                {error && <span className={styles.errorType}>{error}</span>}
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
