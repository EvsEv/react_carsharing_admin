import {
    SET_USER_TOKENS,
    SET_ERROR_OF_LOGGED_AUTH,
    SET_POPUP,
    OPEN_NEW_ENTITY,
    SET_NOTIFICATION,
    SET_BASIC_ERROR,
} from "../types";

const initialState = {
    tokens: null,
    error: null,
    basicError: null,
    notification: null,
    popup: null,
    openNewEntity: false,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_TOKENS:
            return { ...state, tokens: action.payload };
        case SET_ERROR_OF_LOGGED_AUTH:
            return { ...state, error: action.payload };
        case SET_POPUP:
            return { ...state, popup: action.payload };
        case OPEN_NEW_ENTITY:
            return { ...state, openNewEntity: action.payload };
        case SET_NOTIFICATION:
            return { ...state, notification: action.payload };
        case SET_BASIC_ERROR:
            return { ...state, basicError: action.payload };
        default:
            return state;
    }
};
