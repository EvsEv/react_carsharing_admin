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
    const [title, setTitle] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const dropdown = useRef();
    const [showDropdown, setShowDropdown] = useClickNotOnElement(dropdown);

    const inputClasses = [styles.input];
    const searchDropdownClasses = [styles.searchDropdown];

    if (type) {
        searchDropdownClasses.push(styles[type]);
    }

    if (showDropdown) {
        searchDropdownClasses.push(styles.opened);
    }

    if (error) {
        inputClasses.push(styles.error);
    }

    useEffect(() => {
        error && selectedValue?.name !== value && changeValue(null);
    }, [error]);

    useEffect(() => {
        setSuggestions(variants);
    }, [variants]);

    useEffect(() => {
        if (selectedValue) {
            setValue(selectedValue);
            setTitle(selectedValue);
            setError(false);
        } else {
            setTitle("Выберите значение");
            setError("Неверное значение");
        }
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
        const indexOfFoundSuggestion = updatedSuggestions.findIndex(
            (suggestion) => suggestion.name === event.target.value
        );
        if (indexOfFoundSuggestion !== -1) {
            setError(false);
            changeValue(updatedSuggestions[indexOfFoundSuggestion]);
            setSuggestions(variants);
            setShowDropdown(false);
        } else {
            setError("Неверное значение");
        }

        if (!event.target.value) {
            changeValue(null);
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
        setValue(suggestion.name);
        setError(false);
        setSuggestions(variants);
        setShowDropdown(false);
    };

    const resetFilterToNoMatter = () => !value && changeValue(variants[0]);

    return (
        <div className={searchDropdownClasses.join(" ")}>
            {label && (
                <label htmlFor={label} className={styles.label}>
                    {label}
                </label>
            )}
            <div className={styles.inputField}>
                <input
                    className={inputClasses.join(" ")}
                    onChange={onType}
                    value={value || ""}
                    onClick={onInputClick}
                    placeholder={placeholder}
                    name={parameter}
                    title={title}
                    onBlur={resetFilterToNoMatter}
                />
                {error && <span className={styles.errorType}>{error}</span>}
                {showDropdown && (
                    <ul className={styles.suggestion} ref={dropdown}>
                        {suggestions.map((suggestion, idx) => (
                            <li
                                className={styles.item}
                                key={idx}
                                onClick={() => onSuggestionClick(suggestion)}
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
