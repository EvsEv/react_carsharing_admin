import { AUTH, SET_USER_INFO } from "../types";

export const isAuthUser = (isAuth) => ({
    type: AUTH,
    payload: isAuth,
});

export const setUserInfo = (username) => ({
    type: SET_USER_INFO,
    username,
});
