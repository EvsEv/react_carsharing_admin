import { refreshTokens } from "../thunks/auth";
import { SET_ERROR_OF_LOGGED_AUTH } from "../types";

export const refreshToken = (store) => (next) => async (action) => {
    if (action.type === SET_ERROR_OF_LOGGED_AUTH && action.payload === "401") {
        store.dispatch(refreshTokens());
    }
    return next(action);
};
