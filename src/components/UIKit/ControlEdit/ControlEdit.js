import React from "react";
import { putData } from "../../../api/fetch";

import styles from "./controlEdit.module.sass";

export const ControlEdit = ({
    id,
    table,
    confirmedStatus,
    cancelledStatus,
    changeStatus,
}) => {
    const onConfirmed = async () => {
        await putData(table, { orderStatusId: confirmedStatus }, id);
        changeStatus(true);
    };

    const onCancelled = async () => {
        await putData(table, { orderStatusId: cancelledStatus }, id);
        changeStatus(true);
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <button
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
            <button className={[styles.button, styles.changed].join(" ")}>
                Изменить
            </button>
        </form>
    );
};
