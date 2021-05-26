import { refreshTokens } from "../thunks/auth";
import { SET_ERROR } from "../types";

export const refreshToken = (store) => (next) => async (action) => {
    if (action.type === SET_ERROR && action.payload === "401") {
        store.dispatch(refreshTokens());
    }
    return next(action);
};
