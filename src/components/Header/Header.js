import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as NotificationIcon } from "../../assets/icons/notification.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import avatar from "../../assets/images/avatar.jpg";
import useDropdown from "../../hooks/useDropdown";
import { isAuthUser } from "../../redux/actionCreators/auth";

import styles from "./header.module.sass";

export const Header = () => {
    const { userName } = useSelector((state) => state.auth);
    const profileDropdown = useRef();
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useDropdown(profileDropdown);

    const classesForMoreBtn = [styles.more];

    if (showDropdown) {
        classesForMoreBtn.push(styles.active);
    }

    const onProfileClick = () => setShowDropdown(!showDropdown);

    const logOut = () => dispatch(isAuthUser(false));

    return (
        <header className={styles.header}>
            <div className={styles.searchbar}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Поиск ..."
                />
                <SearchIcon />
            </div>
            <div className={styles.user}>
                <button className={styles.notification}>
                    <NotificationIcon />
                    <div className={styles.count}>2</div>
                </button>
                <div className={styles.profile}>
                    <button
                        className={classesForMoreBtn.join(" ")}
                        onClick={onProfileClick}
                    >
                        <picture className={styles.avatar}>
                            <img src={avatar} />
                        </picture>
                        <p className={styles.name}>{userName}</p>
                    </button>
                    {showDropdown && (
                        <div
                            ref={profileDropdown}
                            className={styles.profileDropdown}
                        >
                            <button className={styles.item}>Информация</button>
                            <button className={styles.item} onClick={logOut}>
                                Выйти
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
