import React from "react";
import { Button } from "../../components/UIKit/Button/Button";

import styles from "./loginLayout.module.sass";

export const LoginLayout = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>Logo</div>
            <form className={styles.form}>
                <h1 className={styles.title}>Вход</h1>
                <div className={styles.field}>
                    <label htmlFor="mail" className={styles.label}>
                        Почта
                    </label>
                    <input
                        className={styles.input}
                        type="mail"
                        id="mail"
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
                        type="password"
                        id="password"
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
