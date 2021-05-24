import {
    CHANGE_PAGE_ORDER_LIST,
    COUNT_OF_PAGES_OF_ORDER_LIST,
    GET_CITY_LIST,
    GET_MODEL_LIST,
    GET_ORDER_LIST,
    GET_STATUS_LIST,
    RESET_SETTINGS_ORDER_LIST,
    SET_ERROR,
    SET_PERIOD,
    SET_SELECTED_CITY,
    SET_SELECTED_MODEL,
    SET_SELECTED_STATUS,
} from "../types";

export const addModelListToStore = (modelList) => ({
    type: GET_MODEL_LIST,
    payload: modelList,
});

export const addCityListToStore = (cityList) => ({
    type: GET_CITY_LIST,
    payload: cityList,
});

export const addStatusListToStore = (statusList) => ({
    type: GET_STATUS_LIST,
    payload: statusList,
});

export const addOrderListToStore = (orderList) => ({
    type: GET_ORDER_LIST,
    payload: orderList,
});

export const addSelectedPeriodToStore = (selectedPeriod) => ({
    type: SET_PERIOD,
    payload: selectedPeriod,
});

export const addSelectedModelToStore = (selectedModel) => ({
    type: SET_SELECTED_MODEL,
    payload: selectedModel,
});

export const addSelectedCityToStore = (selectedCity) => ({
    type: SET_SELECTED_CITY,
    payload: selectedCity,
});

export const addSelectedStatusToStore = (selectedStatus) => ({
    type: SET_SELECTED_STATUS,
    payload: selectedStatus,
});

export const changeLastViewedPageInStore = (page) => ({
    type: CHANGE_PAGE_ORDER_LIST,
    payload: page,
});

export const changeCountOfPagesInStore = (count) => ({
    type: COUNT_OF_PAGES_OF_ORDER_LIST,
    payload: count,
});

export const setErrorToStore = (error) => ({ type: SET_ERROR, payload: error });

export const resetSettings = () => ({ type: RESET_SETTINGS_ORDER_LIST });
