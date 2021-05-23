import React from "react";

import styles from "./button.module.sass";

export const Button = ({ type, text, action, disabled }) => {
    return (
        <button
            className={[styles.button, styles[type]].join(" ")}
            type={type}
            disabled={disabled}
            onClick={action}
        >
            {text}
        </button>
    );
};
