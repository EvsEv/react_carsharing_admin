import {
    SET_ERROR_OF_LOGGED_AUTH,
    OPEN_NEW_ENTITY,
    SET_POPUP,
    SET_USER_TOKENS,
    SET_NOTIFICATION,
} from "../types";

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

export const setIsOpenNewEntityToStore = (isOpened) => ({
    type: OPEN_NEW_ENTITY,
    payload: isOpened,
});

export const setNotificationToStore = (notification) => ({
    type: SET_NOTIFICATION,
    payload: notification,
});
