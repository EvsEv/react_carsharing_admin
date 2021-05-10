import { AUTH } from "../types";

export const isAuthUser = (isAuth) => ({
    type: AUTH,
    payload: isAuth,
});
