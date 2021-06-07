import { GET_CAR_ENTITY, GET_ORDER_ENTITY } from "../types";

const initialState = {
    carEntity: null,
    orderEntity: null,
};

export const mainEntities = (state = initialState, action) => {
    switch (action.type) {
        case GET_CAR_ENTITY:
            return { ...state, carEntity: action.payload };
        case GET_ORDER_ENTITY:
            return { ...state, orderEntity: action.payload };
        default:
            return state;
    }
};
