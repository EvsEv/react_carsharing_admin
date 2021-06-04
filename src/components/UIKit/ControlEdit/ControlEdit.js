import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../../api/deleteData";
import { ReactComponent as TrashBinIcon } from "../../../assets/icons/trashBin.svg";
import { setPopup } from "../../../redux/thunks/auth";

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
    const dispatch = useDispatch();
    const classes = [styles.form];

    if (type) {
        classes.push(styles[type]);
    }

    const deleteItem = () => {
        dispatch(
            setPopup({
                type: "delete",
                title: "Вы действительно хотите удалить выбранный элемент?",
                entity: selectedEntity.name,
                idOfItem: itemId,
            })
        );
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
