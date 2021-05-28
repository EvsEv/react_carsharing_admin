import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import LoginLayout from "../../layouts/LoginLayout";
import { setUserTokens } from "../../redux/thunks/auth";

export const App = () => {
    const { tokens } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.tokens) {
            dispatch(setUserTokens(JSON.parse(localStorage.tokens)));
        }
    }, []);

    return (
        <HashRouter basename="/">
            {localStorage.tokens || tokens ? <AdminLayout /> : <LoginLayout />}
        </HashRouter>
    );
};
