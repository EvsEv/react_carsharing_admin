import React from "react";
import { useSelector } from "react-redux";

import { ReactComponent as NotificationIcon } from "../../assets/icons/notification.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import avatar from "../../assets/images/avatar.jpg";

import styles from "./header.module.sass";

export const Header = () => {
    const { userName } = useSelector((state) => state.auth);
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
                <button className={styles.profile}>
                    <picture className={styles.avatar}>
                        <img src={avatar} />
                    </picture>
                    <p className={styles.name}>{userName}</p>
                </button>
            </div>
        </header>
    );
};
