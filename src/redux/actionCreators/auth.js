import { AUTH, REMEMBER_MAIL } from "../types";

export const isAuthUser = (isAuth) => ({ type: AUTH, payload: isAuth });

export const addMailToStore = (mail) => ({
    type: REMEMBER_MAIL,
    payload: mail,
});
