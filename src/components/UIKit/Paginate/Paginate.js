import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import styles from "./paginate.module.sass";

export const Paginate = ({ activePage, countOfPages, changePage }) => {
    const [pages, setPages] = useState([]);
    const dispatch = useDispatch();
    const onClick = (page) => {
        if (page === "...") return console.log("test");
        if (page === "<<") return dispatch(changePage(activePage - 1));
        if (page === ">>") return dispatch(changePage(activePage + 1));
        dispatch(changePage(page));
    };

    useEffect(() => {
        setPages([]);
        if (countOfPages <= 5) {
            if (countOfPages > 0) {
                activePage > 0 && setPages(["<<"]);
                for (let i = 0; i <= countOfPages; i++) {
                    setPages((prev) => [...prev, i]);
                }

                activePage < countOfPages &&
                    setPages((prev) => [...prev, ">>"]);
            }
        } else if (activePage < 4) {
            activePage > 0 && setPages(["<<"]);
            for (let i = 0; i <= 5; i++) {
                setPages((prev) => [...prev, i]);
            }
            setPages((prev) => [...prev, "...", countOfPages, ">>"]);
        } else if (activePage > countOfPages - 4) {
            setPages((prev) => ["<<", 0, ...prev, "..."]);

            for (let i = countOfPages - 4; i <= countOfPages; i++) {
                setPages((prev) => [...prev, i]);
            }
            return;
        } else {
            setPages([
                "<<",
                0,
                "...",
                activePage - 1,
                activePage,
                activePage + 1,
                "...",
                countOfPages,
                ">>",
            ]);
        }
    }, [activePage, countOfPages]);

    return (
        <div>
            {pages.map((page, idx) => (
                <button
                    className={page === activePage ? styles.active : ""}
                    onClick={() => onClick(page)}
                    key={idx}
                >
                    {Number.isInteger(page) ? page + 1 : page}
                </button>
            ))}
        </div>
    );
};
