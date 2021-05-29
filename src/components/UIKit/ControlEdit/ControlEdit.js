import React from "react";

import styles from "./controlEdit.module.sass";

export const ControlEdit = ({ onConfirmed, onCancelled, onChanged }) => {
    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <button
                type="submit"
                className={[styles.button, styles.confirmed].join(" ")}
                onClick={onConfirmed}
            >
                Готово
            </button>
            <button
                className={[styles.button, styles.cancelled].join(" ")}
                onClick={onCancelled}
            >
                Отменить
            </button>
            <button
                onClick={() => onChanged()}
                className={[styles.button, styles.changed].join(" ")}
            >
                Изменить
            </button>
        </form>
    );
};
