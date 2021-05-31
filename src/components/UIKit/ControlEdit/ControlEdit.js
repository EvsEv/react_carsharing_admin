import React from "react";

import styles from "./controlEdit.module.sass";

export const ControlEdit = ({
    onConfirmed,
    onCancelled,
    onChanged,
    isEdited,
    type,
    order,
}) => {
    const classes = [styles.form];

    if (type) {
        classes.push(styles[type]);
    }

    return (
        <form
            className={classes.join(" ")}
            onSubmit={(e) => e.preventDefault()}
        >
            {(isEdited || order) && (
                <button
                    type="submit"
                    className={[styles.button, styles.confirmed].join(" ")}
                    onClick={onConfirmed}
                >
                    Готово
                </button>
            )}
            {(isEdited || order) && (
                <button
                    className={[styles.button, styles.cancelled].join(" ")}
                    onClick={onCancelled}
                >
                    Отменить
                </button>
            )}
            {(!isEdited || order) && (
                <button
                    disabled={isEdited}
                    onClick={() => onChanged()}
                    className={[styles.button, styles.changed].join(" ")}
                >
                    Изменить
                </button>
            )}
        </form>
    );
};
