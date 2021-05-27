import React, { useRef, useState } from "react";
import Button from "../Button";
import SearchDropdown from "../SearchDropdown";

import styles from "./filters.module.sass";
import { useDispatch } from "react-redux";

export const Filters = ({ filters, submitFilters, resetAndUpdate }) => {
    const [showForm, setShowForm] = useState(true);
    const dispatch = useDispatch();
    const form = useRef();

    const formClasses = [styles.form];
    const toggleClasses = [styles.toggle];

    if (!showForm) {
        formClasses.push(styles.hidden);
        toggleClasses.push(styles.rotate);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(submitFilters());
    };
    const onReset = (event) => {
        event.preventDefault();
        dispatch(resetAndUpdate());
    };

    const toggleForm = (event) => setShowForm(!showForm);

    return (
        <>
            <form
                ref={form}
                className={formClasses.join(" ")}
                onSubmit={onSubmit}
                onReset={onReset}
            >
                <div className={styles.parameters}>
                    {filters.map((filter, index) => (
                        <SearchDropdown
                            key={index}
                            label={filter?.label}
                            variants={filter.variants}
                            placeholder={filter.placeholder}
                            selectedValue={filter?.selectedValue}
                            changeValue={filter.changeValue}
                            type="small"
                        />
                    ))}
                </div>
                <div className={styles.control}>
                    <Button text="Сбросить" type="reset" />
                    <Button text="Применить" type="submit" />
                </div>
            </form>
            <button className={toggleClasses.join(" ")} onClick={toggleForm}>
                <span>»</span>
            </button>
        </>
    );
};
