import {
    CHANGE_PAGE_ORDER_LIST,
    COUNT_OF_PAGES_OF_ORDER_LIST,
    GET_FILTERED_ORDER_LIST,
    RESET_SETTINGS_ORDER_LIST,
    SET_CAR_TO_ORDER_LIST,
    SET_CITY_TO_ORDER_LIST,
    SET_ORDER_STATUS_TO_ORDER_LIST,
    SET_PERIOD_TO_ORDER_LIST,
} from "../types";

export const addSelectedPeriodToStore = (selectedPeriod) => ({
    type: SET_PERIOD_TO_ORDER_LIST,
    payload: selectedPeriod,
});

export const addSelectedCarToStore = (selectedCar) => ({
    type: SET_CAR_TO_ORDER_LIST,
    payload: selectedCar,
});

export const addSelectedCityToStore = (selectedCity) => ({
    type: SET_CITY_TO_ORDER_LIST,
    payload: selectedCity,
});

export const addSelectedOrderStatusToStore = (selectedStatus) => ({
    type: SET_ORDER_STATUS_TO_ORDER_LIST,
    payload: selectedStatus,
});

export const getFilteredOrderListToStore = (list) => ({
    type: GET_FILTERED_ORDER_LIST,
    payload: list,
});

export const changeLastViewedPageInStore = (page) => ({
    type: CHANGE_PAGE_ORDER_LIST,
    payload: page,
});

export const changeCountOfPagesInStore = (count) => ({
    type: COUNT_OF_PAGES_OF_ORDER_LIST,
    payload: count,
});

export const resetSettings = () => ({ type: RESET_SETTINGS_ORDER_LIST });
