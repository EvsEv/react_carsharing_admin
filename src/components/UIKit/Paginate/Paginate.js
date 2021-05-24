import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useClickNotOnElement from "../../../hooks/useClickNotOnElement";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";

import styles from "./paginate.module.sass";

export const Paginate = ({ activePage, countOfPages, changePage }) => {
    const [pages, setPages] = useState([]);
    const [searchingPage, setSearchingPage] = useState("");
    const searchDropdown = useRef();
    const dispatch = useDispatch();

    const [showSearchDropdown, setShowSearchDropdown] =
        useClickNotOnElement(searchDropdown);

    useEffect(() => {
        setPages([]);
        if (countOfPages <= 4) {
            if (countOfPages > 0) {
                for (let i = 0; i <= countOfPages; i++) {
                    setPages((prev) => [...prev, i]);
                }
            }
        } else if (activePage < 3) {
            for (let i = 0; i < 5; i++) {
                setPages((prev) => [...prev, i]);
            }
            setPages((prev) => [...prev, "...", countOfPages]);
        } else if (activePage > countOfPages - 3) {
            setPages((prev) => [0, ...prev, "..."]);

            for (let i = countOfPages - 4; i <= countOfPages; i++) {
                setPages((prev) => [...prev, i]);
            }
            return;
        } else {
            setPages([
                0,
                "...",
                activePage - 1,
                activePage,
                activePage + 1,
                "...",
                countOfPages,
            ]);
        }
    }, [activePage, countOfPages]);

    const onClick = (page) => {
        if (page === "...") return setShowSearchDropdown(true);
        dispatch(changePage(page));
    };

    const decreasePage = () => dispatch(changePage(activePage - 1));
    const increasePage = () => dispatch(changePage(activePage + 1));

    const onTypingInSearch = (event) => {
        event.target.validity.valid && setSearchingPage(event.target.value);
    };

    const goToTypedPage = (event) => {
        event.preventDefault();
        setShowSearchDropdown(false);
        dispatch(changePage(searchingPage - 1));
        setSearchingPage("");
    };
    return (
        <div className={styles.paginate}>
            {activePage > 0 && (
                <button
                    onClick={decreasePage}
                    className={[styles.button, styles.decrease].join(" ")}
                >
                    «
                </button>
            )}
            {pages.map((page, idx) => (
                <button
                    className={
                        page === activePage
                            ? [styles.button, styles.active].join(" ")
                            : styles.button
                    }
                    onClick={() => onClick(page)}
                    key={idx}
                >
                    {Number.isInteger(page) ? page + 1 : page}
                </button>
            ))}
            {activePage < countOfPages && (
                <button
                    onClick={increasePage}
                    className={[styles.button, styles.increase].join(" ")}
                >
                    »
                </button>
            )}
            {showSearchDropdown && (
                <form
                    onSubmit={goToTypedPage}
                    ref={searchDropdown}
                    className={styles.dropdown}
                >
                    <input
                        id="searchPage"
                        className={styles.search}
                        value={searchingPage}
                        onChange={onTypingInSearch}
                        type="number"
                        min="0"
                        max={countOfPages + 1}
                        placeholder={`Номер (от 0 до ${countOfPages + 1})`}
                    />
                    <Button
                        type="submit"
                        text="Перейти"
                        disabled={!searchingPage}
                        action={goToTypedPage}
                    />
                </form>
            )}
        </div>
    );
};
