import React from "react";
import { Link } from "react-router-dom";

import styles from "./footer.module.sass";

export const Footer = ({ aside }) => {
    const footerClasses = [styles.footer];

    if (aside) {
        footerClasses.push(styles.aside);
    }

    return (
        <footer className={footerClasses.join(" ")}>
            <div className={styles.linksBlock}>
                <Link to="/admin" className={styles.link}>
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
