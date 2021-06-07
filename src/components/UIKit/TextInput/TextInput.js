import React, { useState } from "react";

import styles from "./textInput.module.sass";

export const TextInput = ({
    title,
    placeholder,
    errorMessage,
    type,
    min,
    max,
    required,
    onChange,
    name,
    value,
}) => {
    const [basicValue, setBasicValue] = useState("");
    const onChangeBasicValue = (event) => setBasicValue(event.target.value);
    return (
        <div className={styles.field}>
            <label htmlFor={title} className={styles.title}>
                {title}
            </label>
            <input
                type={type || "text"}
                placeholder={placeholder}
                id={title}
                className={styles.input}
                min={min}
                max={max}
                name={name}
                required={required || false}
                onChange={onChange || onChangeBasicValue}
                value={value || basicValue}
            />
        </div>
    );
};
