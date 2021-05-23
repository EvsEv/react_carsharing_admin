import React, { useRef } from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./adminLayout.module.sass";
import useClickNotOnElement from "../../hooks/useClickNotOnElement";
import { OrderList } from "../../pages/OrderList/OrderList";
import { CarSetting } from "../../pages/CarSetting/CarSetting";
import CarsTable from "../../pages/CarsTable";
import Error from "../../pages/Error";

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
                <main className={styles.main}>
                    <Switch>
                        <Route path="/" exact render={() => <OrderList />} />
                        <Route
                            path="/carSetting"
                            render={() => <CarSetting />}
                        />
                        <Route path="/carsTable" render={() => <CarsTable />} />
                        <Route
                            path="/500"
                            component={() => <Error number={500} />}
                        />
                        <Route path="" component={() => <Error />} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </div>
    );
};
