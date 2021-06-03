import React from "react";
import { useSelector } from "react-redux";
import { deleteData } from "../../../api/deleteData";
import { ReactComponent as TrashBinIcon } from "../../../assets/icons/trashBin.svg";

import styles from "./controlEdit.module.sass";

export const ControlEdit = ({
    onConfirmed,
    onCancelled,
    onChanged,
    isEdited,
    type,
    order,
    itemId,
}) => {
    const { selectedEntity } = useSelector((state) => state.entitiesList);
    const classes = [styles.form];

    if (type) {
        classes.push(styles[type]);
    }

    const deleteItem = () => {
        deleteData(selectedEntity.name, itemId);
    };

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
            {!isEdited && itemId && (
                <button
                    onClick={deleteItem}
                    className={[styles.button, styles.delete].join(" ")}
                >
                    {" "}
                    <TrashBinIcon />
                    Удалить
                </button>
            )}
        </form>
    );
};
