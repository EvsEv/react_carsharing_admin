import { AUTH, SET_USER_INFO } from "../types";

const initialState = {
    username: null,
    isAuth: false,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            return { ...state, isAuth: action.payload };
        case SET_USER_INFO:
            return { ...state, username: action.username };
        default:
            return state;
    }
};
