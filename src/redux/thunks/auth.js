import { login, logout } from "../../api/fetch";
import { isAuthUser, setUserInfo } from "../actionCreators/auth";

export const isAuthorizeUser = () =>
    isAuthUser(Boolean(Number(localStorage.isAuth)));

export const setUserInformation = (username) => setUserInfo(username);

export const loginUser = () => {
    return async (dispatch) => {
        await login();
        localStorage.setItem("isAuth", 1);
        dispatch(isAuthorizeUser());
        dispatch(setUserInformation("Admin"));
    };
};

export const logoutUser = () => {
    logout();
    localStorage.setItem("isAuth", 0);
    return (dispatch) => {
        dispatch(isAuthorizeUser());
        dispatch(setUserInformation(null));
    };
};
