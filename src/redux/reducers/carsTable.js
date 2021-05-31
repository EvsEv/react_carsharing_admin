import {
    CHANGE_PAGE_CARS_TABLE,
    COUNT_OF_PAGES_OF_CARS_TABLE,
    GET_FILTERED_CARS_TABLE,
    RESET_SETTINGS_CARS_TABLE,
    SET_CARMODEL_TO_CARS_TABLE,
    SET_CATEGORY_TO_CARS_TABLE,
    SET_COLOR_TO_CARS_TABLE,
    SET_MAX_PRICE_TO_CARS_TABLE,
    SET_MIN_PRICE_TO_CARS_TABLE,
} from "../types";

const initialState = {
    selectedCarModel: { name: "Неважно", id: "noMatter" },
    selectedCategory: { name: "Неважно", id: "noMatter" },
    selectedColor: { name: "Неважно", id: "noMatter" },
    filteredCarsList: null,
    priceMin: null,
    priceMax: null,
    lastViewedPage: 0,
    countOfPages: null,
};

export const carsTable = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARMODEL_TO_CARS_TABLE:
            return {
                ...state,
                selectedCarModel: action.payload,
            };
        case SET_CATEGORY_TO_CARS_TABLE:
            return { ...state, selectedCategory: action.payload };
        case SET_COLOR_TO_CARS_TABLE:
            return { ...state, selectedColor: action.payload };
        case SET_MIN_PRICE_TO_CARS_TABLE:
            return { ...state, priceMin: action.payload };
        case SET_MAX_PRICE_TO_CARS_TABLE:
            return { ...state, priceMax: action.payload };
        case CHANGE_PAGE_CARS_TABLE:
            return { ...state, lastViewedPage: action.payload };
        case COUNT_OF_PAGES_OF_CARS_TABLE:
            return { ...state, countOfPages: action.payload };
        case GET_FILTERED_CARS_TABLE:
            return { ...state, filteredCarsList: action.payload };
        case RESET_SETTINGS_CARS_TABLE:
            return {
                ...state,
                selectedCarModel: initialState.selectedCarModel,
                selectedCategory: initialState.selectedCategory,
                priceMin: initialState.priceMin,
                priceMax: initialState.priceMax,
                lastViewedPage: 0,
            };
        default:
            return state;
    }
};
