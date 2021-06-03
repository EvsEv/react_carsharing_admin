import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../api/deleteData";
import { rusification } from "../../constants/rusification";
import { setPopup } from "../../redux/thunks/auth";
import Button from "../UIKit/Button";

import styles from "./popup.module.sass";

export const Popup = () => {
    const { type, entity, idOfItem, title } = useSelector(
        (state) => state.auth.popup
    );
    const dispatch = useDispatch();

    const onSubmitPopup = () => {
        if (type === "delete") {
            deleteData(entity.name, idOfItem);
        }
    };

    const onClosePopup = () => {
        dispatch(setPopup(null));
    };

    return (
        <section className={styles.popup}>
            <form className={styles.form}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.control}>
                        <Button
                            type="submit"
                            text={rusification[type]}
                            action={onSubmitPopup}
                        />
                        <Button
                            type="reset"
                            text="Отмена"
                            action={onClosePopup}
                        />
                    </div>
                </div>
            </form>
        </section>
    );
};
