import React, { useEffect, useState } from "react";
import Button from "../Button";
import SearchDropdown from "../SearchDropdown";
import { fetchData, fetchDataWithComplexParamters } from "../../../api/fetch";

import styles from "./filters.module.sass";
import { useDispatch } from "react-redux";
import {
    changeLastViewedPage,
    getOrderList,
} from "../../../redux/thunks/orderList";

export const Filters = ({ filters }) => {
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(changeLastViewedPage(0));
    };
    const onReset = (event) => {
        event.preventDefault();
        console.log("тыщ");
    };

    useEffect(() => {
        dispatch(getOrderList());
    }, []);

    return (
        <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
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
    );
};
