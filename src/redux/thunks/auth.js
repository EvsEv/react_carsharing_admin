import { login, logout } from "../../api/fetch";
import { isAuthUser } from "../actionCreators/auth";

export const isAuthorizeUser = () => (dispatch) =>
    dispatch(isAuthUser(Boolean(Number(localStorage.isAuth))));

export const loginUser = () => {
    login();
    localStorage.setItem("isAuth", 1);
    return isAuthorizeUser();
};

export const logoutUser = () => {
    logout();
    localStorage.setItem("isAuth", 0);
    return isAuthorizeUser();
};
