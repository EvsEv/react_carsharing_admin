import React, { useEffect, useRef } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import styles from "./adminLayout.module.sass";
import useClickNotOnElement from "../../hooks/useClickNotOnElement";
import { OrderList } from "../../pages/OrderList/OrderList";
import { CarSetting } from "../../pages/CarSetting/CarSetting";
import CarsTable from "../../pages/CarsTable";
import Error from "../../pages/Error";
import { fetchData } from "../../api/fetch";
import EntitiesList from "../../pages/EntitiesList";
import { useSelector } from "react-redux";
import Popup from "../../components/Popup";
import NewEntity from "../../components/NewEntity";
import Notification from "../../components/UIKit/Notification";
export const AdminLayout = () => {
    const menu = useRef();
    const [showElement, setShowElement] = useClickNotOnElement(menu);
    const { popup, openNewEntity, basicError } = useSelector(
        (state) => state.auth
    );
    const history = useHistory();

    if (history.location.pathname === "/") {
        history.push("/admin");
    }

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
                    <Notification />
                    <Switch>
                        <Route
                            path="/admin"
                            exact
                            render={() => <EntitiesList />}
                        />
                        <Route
                            path="/admin/orderList"
                            render={() => <OrderList />}
                        />
                        <Route
                            path="/admin/carSetting"
                            exact
                            render={() => <CarSetting />}
                        />
                        {!basicError && (
                            <Route
                                path="/admin/carSetting/:id"
                                render={() => <CarSetting />}
                            />
                        )}
                        <Route
                            path="/admin/carsTable"
                            render={() => <CarsTable />}
                        />
                        <Route component={() => <Error />} />
                        {basicError && (
                            <Route
                                path="/admin/carSetting/:id"
                                component={() => <Error error={basicError} />}
                            />
                        )}
                    </Switch>
                </main>
                <Footer />
            </div>
            {popup && <Popup />}
            {openNewEntity && <NewEntity />}
        </div>
    );
};
