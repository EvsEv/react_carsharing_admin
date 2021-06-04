import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../../redux/thunks/auth";

import styles from "./notification.module.sass";

export const Notification = () => {
    const { notification } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const classes = [styles.notification];

    if (notification?.type) {
        classes.push(styles[notification.type]);
    }

    useEffect(() => {
        let notificationTimeout = setTimeout(() => {
            dispatch(setNotification(null));
        }, 2000);

        return () => {
            clearTimeout(notificationTimeout);
        };
    }, [notification]);

    const close = () => dispatch(setNotification(null));

    return (
        notification && (
            <div className={classes.join(" ")}>
                <p>{notification?.text}</p>
                <button onClick={close} className={styles.close}></button>
            </div>
        )
    );
};
