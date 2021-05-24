import React from "react";

import styles from "./checkbox.module.sass";

export const Checkbox = ({
    name,
    value,
    onChange,
    label,
    checked,
    notEditable,
}) => {
    const labelClass = [styles.label];

    if (notEditable) {
        labelClass.push(styles.notEditable);
    }

    return (
        <label className={labelClass.join(" ")}>
            <input
                name={name}
                value={value}
                type="checkbox"
                className={styles.input}
                onChange={onChange}
                checked={checked || false}
                disabled={notEditable}
            />
            <span className={styles.checkbox}></span>
            <span className={styles.text}>{label}</span>
        </label>
    );
};
