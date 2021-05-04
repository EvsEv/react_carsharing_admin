import React from "react";
import { NavLink, Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as AlarmIcon } from "../../assets/icons/menu/alarm.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/menu/edit.svg";
import { ReactComponent as FormIcon } from "../../assets/icons/menu/form.svg";
import { ReactComponent as ListIcon } from "../../assets/icons/menu/list.svg";
import { ReactComponent as NewIcon } from "../../assets/icons/menu/new.svg";
import { ReactComponent as PersonIcon } from "../../assets/icons/menu/person.svg";
import { ReactComponent as ShapeIcon } from "../../assets/icons/menu/shape.svg";

import styles from "./menu.module.sass";

export const Menu = () => {
    return (
        <aside className={styles.menu}>
            <div className={styles.logo}>
                <Link to="/" className={styles.link}>
                    <Logo className={styles.logotype} />
                    <h2 className={styles.name}>Need for car</h2>
                </Link>
            </div>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink
                            to="/car-setting"
                            activeClassName={styles.active}
                            className={styles.link}
                        >
                            <EditIcon />
                            Карточка автомобиля
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink
                            to="/cars-table"
                            activeClassName={styles.active}
                            className={styles.link}
                        >
                            <ListIcon />
                            Список авто
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink
                            exact
                            to="/"
                            activeClassName={styles.active}
                            className={styles.link}
                        >
                            <NewIcon />
                            Заказы
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.link}>
                            <ShapeIcon />
                            Menu 4
                        </p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.link}>
                            <FormIcon />
                            Menu 5
                        </p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.link}>
                            <PersonIcon />
                            Menu 6
                        </p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.link}>
                            <AlarmIcon />
                            Menu 7
                        </p>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
