import { SET_USER_TOKENS } from "../types";

export const setUserTokensToStore = (tokens) => ({
    type: SET_USER_TOKENS,
    payload: tokens,
});
