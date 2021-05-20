import React from "react";

import styles from "./checkbox.module.sass";

export const Checkbox = ({ name, value, onChange, label, checked }) => {
    return (
        <label className={styles.label}>
            <input
                name={name}
                value={value}
                type="checkbox"
                className={styles.input}
                onChange={onChange}
                checked={checked || false}
            />
            <span className={styles.checkbox}></span>
            <span className={styles.text}>{label}</span>
        </label>
    );
};
