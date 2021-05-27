import {
    GET_CITY_LIST,
    GET_ORDER_STATUS_LIST,
    GET_CARS_LIST,
    GET_FILTERED_ORDER_LIST,
} from "../types";

export const addCarsListToStore = (modelList) => ({
    type: GET_CARS_LIST,
    payload: modelList,
});

export const addCityListToStore = (cityList) => ({
    type: GET_CITY_LIST,
    payload: cityList,
});

export const addOrderStatusListToStore = (statusList) => ({
    type: GET_ORDER_STATUS_LIST,
    payload: statusList,
});

export const getFilteredOrderListToStore = (list) => ({
    type: GET_FILTERED_ORDER_LIST,
    payload: list,
});
