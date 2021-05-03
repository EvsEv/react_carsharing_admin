import React, { useState } from "react";
import { Button } from "../../components/UIKit/Button/Button";

import { ReactComponent as Logo } from "../../assets/icons/logo.svg";

import styles from "./loginLayout.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { authorizeUser } from "../../redux/thunks/auth";

export const LoginLayout = () => {
    const { mail } = useSelector((state) => state.auth);
    const [mailValue, setMailValue] = useState(mail);
    const dispatch = useDispatch();

    const onChangeMail = (event) => {
        if (event.target.validity.valid) {
            setMailValue(event.target.value);
        }
    };
    const onSubmit = (event) => dispatch(authorizeUser(mailValue));

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo />
                <p className={styles.name}>Need for drive</p>
            </div>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.title}>Вход</h1>
                <div className={styles.field}>
                    <label htmlFor="mail" className={styles.label}>
                        Почта
                    </label>
                    <input
                        className={styles.input}
                        type="email"
                        id="mail"
                        name="mail"
                        required
                        placeholder="Введите почту"
                        defaultValue={mail}
                        onChange={(event) => onChangeMail(event)}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="password" className={styles.label}>
                        Пароль
                    </label>
                    <input
                        className={styles.input}
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Введите пароль"
                    />
                </div>
                <div className={styles.access}>
                    <a href="#" className={styles.request}>
                        Запросить доступ
                    </a>
                    <Button type="submit" text="Войти" />
                </div>
            </form>
        </div>
    );
};
