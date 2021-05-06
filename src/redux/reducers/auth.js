import { AUTH, REMEMBER_MAIL } from '../types';

const initialState = {
    mail: 'admin@ss.com',
    userName: 'Admin',
    isAuth: false,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            return { ...state, isAuth: action.payload };
        case REMEMBER_MAIL:
            return { ...state, mail: action.payload };
        default:
            return state;
    }
};
