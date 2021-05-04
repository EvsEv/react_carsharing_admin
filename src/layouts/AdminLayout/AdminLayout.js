import React from "react";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./adminLayout.module.sass";

export const AdminLayout = () => {
    return (
        <div className={styles.body}>
            <Menu />
            <div className={styles.wrapper}>
                <Header />
                <main className={styles.content}></main>
                <Footer />
            </div>
        </div>
    );
};
