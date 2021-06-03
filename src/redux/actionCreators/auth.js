import { SET_ERROR_OF_LOGGED_AUTH, SET_POPUP, SET_USER_TOKENS } from "../types";

export const setUserTokensToStore = (tokens) => {
    return {
        type: SET_USER_TOKENS,
        payload: tokens,
    };
};

export const setErrorOfLoggedAuthToStore = (error) => ({
    type: SET_ERROR_OF_LOGGED_AUTH,
    payload: error,
});

export const setPopupToStore = (popup) => ({ type: SET_POPUP, payload: popup });
