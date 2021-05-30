import React from "react";

import styles from "./controlEdit.module.sass";

export const ControlEdit = ({
    onConfirmed,
    onCancelled,
    onChanged,
    isEdited,
}) => {
    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            {isEdited && (
                <button
                    type="submit"
                    className={[styles.button, styles.confirmed].join(" ")}
                    onClick={onConfirmed}
                >
                    Готово
                </button>
            )}
            {isEdited && (
                <button
                    className={[styles.button, styles.cancelled].join(" ")}
                    onClick={onCancelled}
                >
                    Отменить
                </button>
            )}
            <button
                disabled={isEdited}
                onClick={() => onChanged()}
                className={[styles.button, styles.changed].join(" ")}
            >
                Изменить
            </button>
        </form>
    );
};
