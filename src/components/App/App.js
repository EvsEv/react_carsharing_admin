import React from "react";
import { useSelector } from "react-redux";
import { HashRouter } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import LoginLayout from "../../layouts/LoginLayout";

export const App = () => {
    const { isAuth } = useSelector((state) => state.auth);

    return (
        <HashRouter basename="/">
            {isAuth ? <AdminLayout /> : <LoginLayout />}
        </HashRouter>
    );
};
