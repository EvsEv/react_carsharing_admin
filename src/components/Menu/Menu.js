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

export const Menu = React.forwardRef((props, ref) => {
    const classesForMenu = [styles.menu];
    if (props.showMenu) {
        classesForMenu.push(styles.showMenu);
        console.log(props.showMenu);
    }

    const onClickLink = () => props.setShowMenu(false);

    return (
        <aside className={classesForMenu.join(" ")} ref={ref}>
            <div className={styles.logo}>
                <Link to='/' className={styles.link} onClick={onClickLink}>
                    <Logo className={styles.logotype} />
                    <h2 className={styles.name}>Need for car</h2>
                </Link>
            </div>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink
                            to='/carSetting'
                            activeClassName={styles.active}
                            className={styles.link}
                            onClick={onClickLink}
                        >
                            <EditIcon />
                            Карточка автомобиля
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink
                            to='/carsTable'
                            activeClassName={styles.active}
                            className={styles.link}
                            onClick={onClickLink}
                        >
                            <ListIcon />
                            Список авто
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink
                            exact
                            to='/'
                            activeClassName={styles.active}
                            className={styles.link}
                            onClick={onClickLink}
                        >
                            <NewIcon />
                            Заказы
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.link} title='В разработке'>
                            <ShapeIcon />
                            Menu 4
                        </p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.link} title='В разработке'>
                            <FormIcon />
                            Menu 5
                        </p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.link} title='В разработке'>
                            <PersonIcon />
                            Menu 6
                        </p>
                    </li>
                    <li className={styles.item}>
                        <p className={styles.link} title='В разработке'>
                            <AlarmIcon />
                            Menu 7
                        </p>
                    </li>
                </ul>
            </nav>
        </aside>
    );
});
