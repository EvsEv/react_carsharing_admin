import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./error.module.sass";
import buttonLike from "../../components/UIKit/Button/button.module.sass";

export const Error = ({ number, reason, recomendation }) => {
    const classesForLink = [buttonLike.button, buttonLike.link];
    return (
        <section className={styles.page}>
            <h1 className={styles.number}>{number || 404}</h1>
            <p className={styles.reason}>{reason || "Страница не найдена"}</p>
            {recomendation ? (
                <p className={styles.recommendation}>{recomendation}</p>
            ) : (
                <div className={styles.wrapper}>
                    <p className={styles.recommendation}>
                        Возможно, Вы хотели посетить одну из доступных страниц:
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <NavLink
                                to="/admin"
                                className={classesForLink.join(" ")}
                            >
                                Параметры
                            </NavLink>
                        </li>
                        <li className={styles.item}>
                            <NavLink
                                to="/admin/orderList"
                                className={classesForLink.join(" ")}
                            >
                                Заказы
                            </NavLink>
                        </li>
                        <li className={styles.item}>
                            <NavLink
                                to="/admin/carsTable"
                                className={classesForLink.join(" ")}
                            >
                                Список автомобилей
                            </NavLink>
                        </li>
                        <li className={styles.item}>
                            <NavLink
                                to="/admin/carSetting"
                                className={classesForLink.join(" ")}
                            >
                                Карточка автомоблия
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </section>
    );
};
