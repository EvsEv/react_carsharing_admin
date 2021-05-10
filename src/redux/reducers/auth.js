import { AUTH, REMEMBER_MAIL } from "../types";

const initialState = {
    isAuth: false,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            return { ...state, isAuth: action.payload };
        default:
            return state;
    }
};
