import React from "react";

import styles from "./button.module.sass";

export const Button = ({ type, text, action, disabled, mod }) => {
    return (
        <button
            className={[styles.button, styles[type], styles[mod]].join(" ")}
            type={type}
            disabled={disabled}
            onClick={action}
        >
            {text}
        </button>
    );
};
