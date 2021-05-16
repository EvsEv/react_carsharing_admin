import {
    GET_CITY_LIST,
    GET_MODEL_LIST,
    GET_STATUS_LIST,
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
