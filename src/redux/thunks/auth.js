import { getUpdatedTokens } from "../../api/fetch";
import {
    setErrorOfLoggedAuthToStore,
    setIsOpenNewEntityToStore,
    setNotificationToStore,
    setPopupToStore,
    setUserTokensToStore,
} from "../actionCreators/auth";

export const setUserTokens = (tokens) => (dispatch) => {
    console.log("tok", tokens);
    dispatch(setUserTokensToStore(tokens));
};

export const refreshTokens = () => async (dispatch, getState) => {
    const { tokens } = getState().auth;
    const updatedTokens = await getUpdatedTokens(tokens?.refresh_token);
    localStorage.setItem("tokens", JSON.stringify(updatedTokens));
    dispatch(setUserTokensToStore(updatedTokens));
};

export const setErrorOfLoggedAuth = (error) => (dispatch) =>
    dispatch(setErrorOfLoggedAuthToStore(error));

export const setPopup = (popup) => (dispatch) =>
    dispatch(setPopupToStore(popup));

export const openNewEntity = (isOpen) => (dispatch) =>
    dispatch(setIsOpenNewEntityToStore(isOpen));

export const setNotification = (notification) => (dispatch) => {
    dispatch(setNotificationToStore(notification));
};
