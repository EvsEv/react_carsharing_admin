import {
    CHANGE_PAGE_CARS_TABLE,
    COUNT_OF_PAGES_OF_CARS_TABLE,
    GET_FILTERED_CARS_TABLE,
    RESET_SETTINGS_CARS_TABLE,
    SET_CARMODEL_TO_CARS_TABLE,
    SET_CATEGORY_TO_CARS_TABLE,
    SET_MAX_PRICE_TO_CARS_TABLE,
    SET_MIN_PRICE_TO_CARS_TABLE,
} from "../types";

export const addSelectedCarModelToStore = (carModel) => ({
    type: SET_CARMODEL_TO_CARS_TABLE,
    payload: carModel,
});

export const addSelectedCategoryToStore = (category) => ({
    type: SET_CATEGORY_TO_CARS_TABLE,
    payload: category,
});

export const addMinPriceToStore = (price) => ({
    type: SET_MIN_PRICE_TO_CARS_TABLE,
    payload: price,
});

export const addMaxPriceToStore = (price) => ({
    type: SET_MAX_PRICE_TO_CARS_TABLE,
    payload: price,
});

export const getFilteredCarsTableToStore = (list) => ({
    type: GET_FILTERED_CARS_TABLE,
    payload: list,
});

export const changeLastViewedPageInStore = (page) => ({
    type: CHANGE_PAGE_CARS_TABLE,
    payload: page,
});

export const changeCountOfPagesInStore = (count) => ({
    type: COUNT_OF_PAGES_OF_CARS_TABLE,
    payload: count,
});

export const resetSettings = () => ({ type: RESET_SETTINGS_CARS_TABLE });
