import { GET_CAR_ENTITY, GET_ORDER_ENTITY } from "../types";

export const addCarEntityToStore = (carEntity) => ({
    type: GET_CAR_ENTITY,
    payload: carEntity,
});

export const addOrderEntityToStore = (orderEntity) => ({
    type: GET_ORDER_ENTITY,
    payload: orderEntity,
});
