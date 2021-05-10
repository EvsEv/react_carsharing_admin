import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import LoginLayout from "../../layouts/LoginLayout";
import { isAuthorizeUser } from "../../redux/thunks/auth";

export const App = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(isAuthorizeUser());
    }, []);

    return (
        <HashRouter basename='/'>
            {isAuth ? <AdminLayout /> : <LoginLayout />}
        </HashRouter>
    );
};
