import { SET_USER_TOKENS } from "../types";

const initialState = {
    tokens: null,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_TOKENS:
            return { ...state, tokens: action.payload };
        default:
            return state;
    }
};
