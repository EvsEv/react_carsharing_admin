import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import SearchDropdown from "../SearchDropdown";

import styles from "./filters.module.sass";
import { useDispatch } from "react-redux";

export const Filters = ({
    filters,
    submitFilters,
    resetAndUpdate,
    rangeFilters,
    correctCondition,
}) => {
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
        // if (rangeFilters) {
        //     rangeFilters.changeMinValue(minValue);
        //     rangeFilters.changeMaxValue(maxValue);
        // }
        submitFilters();
    };
    const onReset = (event) => {
        event.preventDefault();
        resetAndUpdate();
    };

    const toggleForm = () => setShowForm(!showForm);

    const setMinPrice = (event) =>
        rangeFilters.changeMinValue(event.target.value);

    const setMaxPrice = (event) =>
        rangeFilters.changeMaxValue(event.target.value);

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
                    {rangeFilters && (
                        <>
                            <div className={styles.inputField}>
                                <p className={styles.name}>
                                    {rangeFilters.minName}
                                </p>
                                <input
                                    className={styles.input}
                                    type="number"
                                    onChange={setMinPrice}
                                    min={0}
                                    max={rangeFilters.maxValue}
                                    step={1000}
                                    value={rangeFilters.minValue}
                                    placeholder="Неважно"
                                />
                            </div>
                            <div className={styles.inputField}>
                                <p className={styles.name}>
                                    {rangeFilters.maxName}
                                </p>
                                <input
                                    className={styles.input}
                                    type="number"
                                    min={rangeFilters.minValue || 0}
                                    step={1000}
                                    onChange={setMaxPrice}
                                    value={rangeFilters.maxValue}
                                    placeholder="Неважно"
                                />
                            </div>{" "}
                        </>
                    )}
                </div>
                <div className={styles.control}>
                    <Button text="Сбросить" type="reset" />
                    <Button
                        text="Применить"
                        disabled={!correctCondition}
                        type="submit"
                    />
                </div>
            </form>
            <button className={toggleClasses.join(" ")} onClick={toggleForm}>
                <span>»</span>
            </button>
        </>
    );
};
