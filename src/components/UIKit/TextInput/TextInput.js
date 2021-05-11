import React from "react";

import styles from "./textInput.module.sass";

export const TextInput = ({ title, placeholder, errorMessage }) => {
    return (
        <div className={styles.field}>
            <label htmlFor={title} className={styles.title}>
                {title}
            </label>
            <input
                placeholder={placeholder}
                id={title}
                className={styles.input}
            />
        </div>
    );
};
