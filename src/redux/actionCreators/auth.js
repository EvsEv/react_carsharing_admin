import { SET_USER_TOKENS } from "../types";

export const setUserTokensToStore = (tokens) => {
    console.log("tok2", tokens);
    return {
        type: SET_USER_TOKENS,
        payload: tokens,
    };
};
