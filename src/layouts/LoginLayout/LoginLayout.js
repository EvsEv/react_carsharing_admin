import React, { useState } from "react";
import { Button } from "../../components/UIKit/Button/Button";
import { useHistory } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/icons/logo.svg";

import styles from "./loginLayout.module.sass";
import { useDispatch } from "react-redux";
import { setUserTokens } from "../../redux/thunks/auth";
import { login } from "../../api/fetch";

export const LoginLayout = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();

    if (history.location.pathname === "/") {
        history.push("/admin");
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const response = await login(username, password);
        if (response) {
            localStorage.setItem("tokens", JSON.stringify(response));
            dispatch(setUserTokens(response));
        } else {
            setShowNotification(true);
        }
    };

    const changeUsername = (event) => {
        setUsername(event.target.value);
    };

    const changePassword = (event) => {
        setPassword(event.target.value);
    };

    const hideNotification = () => setShowNotification(false);

    return (
        <div className={styles.wrapper}>
            {showNotification && (
                <div className={styles.notification}>
                    <span>Не удаётся войти.</span> Пожалуйста, проверьте
                    правильность написания <span>логина</span> и{" "}
                    <span>пароля</span>.
                    <ul>
                        <li>Возможно, нажата клавиша Caps Lock?</li>
                        <li>
                            Может быть, у Вас включена неправильная раскладка?
                            (русская или английская)
                        </li>
                        <li>
                            Попробуйте набрать свой пароль в текстовом редакторе
                            и скопировать в графу «Пароль»
                        </li>
                    </ul>
                    <button onClick={hideNotification}>Скрыть</button>
                </div>
            )}
            <div className={styles.logo}>
                <Logo />
                <p className={styles.name}>Need for drive</p>
            </div>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.title}>Вход</h1>
                <div className={styles.field}>
                    <label htmlFor="mail" className={styles.label}>
                        Имя пользователя
                    </label>
                    <input
                        className={styles.input}
                        value={username}
                        onChange={changeUsername}
                        type="text"
                        id="mail"
                        name="mail"
                        required
                        placeholder="Введите почту"
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="password" className={styles.label}>
                        Пароль
                    </label>
                    <input
                        className={styles.input}
                        value={password}
                        onChange={changePassword}
                        type="password"
                        id="password"
                        name="password"
                        required
                        placeholder="Введите пароль"
                    />
                </div>
                <div className={styles.access}>
                    <p className={styles.request}>Запросить доступ</p>
                    <Button type="submit" text="Войти" />
                </div>
            </form>
        </div>
    );
};
