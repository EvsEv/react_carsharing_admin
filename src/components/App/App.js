import React from "react";
import { useSelector } from "react-redux";
import AdminLayout from "../../layouts/AdminLayout";
import LoginLayout from "../../layouts/LoginLayout";

export const App = () => {
    const { isAuth } = useSelector((state) => state.auth);

    if (!isAuth) {
        return <LoginLayout />;
    }

    return <AdminLayout />;
};
