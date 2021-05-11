import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import LoginLayout from "../../layouts/LoginLayout";
import { loginUser } from "../../redux/thunks/auth";

export const App = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        if (localStorage.isAuth === "1") {
            dispatch(loginUser());
        }
    }, []);

    const printLayout = useMemo(() => {
        if (localStorage.isAuth === "1") {
            return <AdminLayout />;
        }
        return <LoginLayout />;
    }, [isAuth]);

    return <HashRouter basename='/'>{printLayout}</HashRouter>;
};
