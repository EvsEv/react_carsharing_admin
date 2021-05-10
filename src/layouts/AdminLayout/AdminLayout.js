import React, { useRef } from "react";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./adminLayout.module.sass";
import useClickNotOnElement from "../../hooks/useClickNotOnElement";
import TextInput from "../../components/UIKit/TextInput";
import SearchDropdown from "../../components/UIKit/SearchDropdown";

export const AdminLayout = () => {
    const menu = useRef();
    const [showElement, setShowElement] = useClickNotOnElement(menu);
    return (
        <div className={styles.body}>
            <Menu
                showMenu={showElement}
                setShowMenu={setShowElement}
                ref={menu}
            />
            <div className={styles.wrapper}>
                <Header setShowMenu={setShowElement} />
                <main className={styles.content}>
                    {/* <TextInput
                        title='Модель автомобиля'
                        placeholder='Введите название модели'
                    /> */}
                    <SearchDropdown
                        label='Тип автомобиля'
                        placeholder='Введите категорию'
                    />
                </main>
                <Footer />
            </div>
        </div>
    );
};
