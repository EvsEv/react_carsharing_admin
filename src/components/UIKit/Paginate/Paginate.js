import React from "react";
import { useDispatch } from "react-redux";

import styles from "./paginate.module.sass";

export const Paginate = ({ activePage, countOfPages, changePage }) => {
    const dispatch = useDispatch();
    const onClick = (page) => {
        dispatch(changePage(page));
    };

    return (
        <div>
            <button onClick={() => onClick(0)}>1</button>
            <button>...</button>
            <button onClick={() => onClick(activePage - 1)}>
                {activePage}
            </button>
            <button onClick={() => onClick(activePage)}>
                {activePage + 1}
            </button>
            <button onClick={() => onClick(activePage + 1)}>
                {activePage + 2}
            </button>
            <button>...</button>
            <button onClick={() => onClick(countOfPages)}>
                {countOfPages}
            </button>
        </div>
    );
};
