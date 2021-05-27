import { SET_ERROR_OF_LOGGED_AUTH, SET_USER_TOKENS } from "../types";

export const setUserTokensToStore = (tokens) => {
    console.log("tok2", tokens);
    return {
        type: SET_USER_TOKENS,
        payload: tokens,
    };
};

export const setErrorOfLoggedAuthToStore = (error) => ({
    type: SET_ERROR_OF_LOGGED_AUTH,
    payload: error,
});
