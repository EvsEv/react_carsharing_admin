import React from "react";
import { Link } from "react-router-dom";

import styles from "./footer.module.sass";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.linksBlock}>
                <Link to="/" className={styles.link}>
                    Главная страница
                </Link>
                <a
                    target="_blank"
                    href="https://evsev.github.io/react_carsharing/build/#/"
                    className={styles.link}
                >
                    Клиентская версия
                </a>
            </div>
            <p className={styles.copyright}>Copyright © 2020 Simbirsoft</p>
        </footer>
    );
};
