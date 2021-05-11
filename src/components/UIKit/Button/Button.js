import React from "react";

import styles from "./button.module.sass";

export const Button = ({ type, text, action }) => {
    return (
        <button className={styles[type]} type={type}>
            {text}
        </button>
    );
};
