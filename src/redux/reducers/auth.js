import { SET_USER_TOKENS, SET_ERROR_OF_LOGGED_AUTH } from "../types";

const initialState = {
    tokens: null,
    error: null,
    notification: null,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_TOKENS:
            return { ...state, tokens: action.payload };
        case SET_ERROR_OF_LOGGED_AUTH:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
