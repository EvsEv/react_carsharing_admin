import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import avatar from '../../assets/images/avatar.jpg';
import useClickNotOnElement from '../../hooks/useClickNotOnElement';
import { isAuthUser } from '../../redux/actionCreators/auth';

import styles from './header.module.sass';

export const Header = ({ setShowMenu }) => {
    const { userName } = useSelector((state) => state.auth);
    const profileDropdown = useRef();
    const searchbar = useRef();
    const dispatch = useDispatch();
    const [showProfileDropdown, setShowProfleDropdown] = useClickNotOnElement(
        profileDropdown
    );

    const [showSearch, setShowSearch] = useClickNotOnElement(searchbar);

    const classesForMoreBtn = [styles.more];
    const classesForSearchbar = [styles.searchbar];

    if (showProfileDropdown) {
        classesForMoreBtn.push(styles.active);
    }
    if (showSearch) {
        classesForSearchbar.push(styles.movingFromTop);
    }

    const classesForMobileOnly = (defaultClass) =>
        `${defaultClass} ${styles.mobileOnly}`;

    const classesForTabletIncluded = (defaultClass) =>
        `${defaultClass} ${styles.tabletIncluded}`;

    const onProfileClick = () => setShowProfleDropdown(!showProfileDropdown);

    const onClickSearchButton = () => setShowSearch(!showSearch);

    const logOut = () => dispatch(isAuthUser(false));

    return (
        <header className={styles.header}>
            <button
                className={classesForTabletIncluded(styles.showBtn)}
                onClick={() => setShowMenu(true)}
            >
                <span className={styles.burger}></span>
            </button>
            <button
                className={classesForMobileOnly(styles.showBtn)}
                onClick={onClickSearchButton}
            >
                <SearchIcon />
            </button>
            <div className={classesForSearchbar.join(' ')} ref={searchbar}>
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Поиск ...'
                />
                <SearchIcon />
            </div>
            <div className={styles.user}>
                <button className={styles.showBtn}>
                    <NotificationIcon />
                    <div className={styles.count}>2</div>
                </button>
                <div className={styles.profile}>
                    <button
                        className={classesForMoreBtn.join(' ')}
                        onClick={onProfileClick}
                    >
                        <picture className={styles.avatar}>
                            <img src={avatar} />
                        </picture>
                        <p className={styles.name}>{userName}</p>
                    </button>
                    {showProfileDropdown && (
                        <div
                            ref={profileDropdown}
                            className={styles.profileDropdown}
                        >
                            <button className={styles.item}>Информация</button>
                            <button className={styles.item} onClick={logOut}>
                                Выйти
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
