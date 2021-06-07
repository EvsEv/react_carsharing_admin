import React, { useState } from "react";
import TextInput from "../TextInput";
import Checkbox from "../Checkbox";

import styles from "./arrayInput.module.sass";

export const ArrayInput = ({ setArray, array, title }) => {
    const [value, setValue] = useState("");

    const onChange = (event) => setValue(event.target.value);
    const addItem = (event) => {
        event.preventDefault();
        if (!array.find((item) => item === value)) {
            setArray((prev) => [...prev, value]);
        }
    };
    const deleteItem = (index) =>
        setArray((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1, prev.length),
        ]);

    return (
        <>
            <div className={styles.inputField}>
                <TextInput title={title} value={value} onChange={onChange} />
                <button className={styles.button} onClick={addItem}>
                    +
                </button>
            </div>
            {!array.length && (
                <div className={styles.notification}>
                    <p>Минимум 1 элемент</p>
                </div>
            )}
            <ul className={styles.wrapper}>
                {array.map((item, index) => (
                    <li className={styles.item} key={index}>
                        <Checkbox
                            value={item}
                            label={item}
                            onChange={() => deleteItem(index)}
                            checked={true}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};
