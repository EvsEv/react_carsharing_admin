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

const initialState = {
    selectedPeriod: { name: "Неважно", id: "noMatter" },
    selectedCar: { name: "Неважно", id: "noMatter" },
    selectedCity: { name: "Неважно", id: "noMatter" },
    selectedOrderStatus: { name: "Неважно", id: "noMatter" },
    filteredOrderList: null,
    lastViewedPage: 0,
    countOfPages: null,
};

export const orderList = (state = initialState, action) => {
    switch (action.type) {
        case SET_PERIOD_TO_ORDER_LIST: {
            return { ...state, selectedPeriod: action.payload };
        }
        case SET_CAR_TO_ORDER_LIST:
            return { ...state, selectedCar: action.payload };
        case SET_CITY_TO_ORDER_LIST:
            return { ...state, selectedCity: action.payload };
        case SET_ORDER_STATUS_TO_ORDER_LIST:
            return { ...state, selectedOrderStatus: action.payload };
        case CHANGE_PAGE_ORDER_LIST:
            return { ...state, lastViewedPage: action.payload };
        case COUNT_OF_PAGES_OF_ORDER_LIST:
            return { ...state, countOfPages: action.payload };
        case GET_FILTERED_ORDER_LIST:
            return { ...state, filteredOrderList: action.payload };
        case RESET_SETTINGS_ORDER_LIST:
            return {
                ...state,
                selectedPeriod: initialState.selectedPeriod,
                selectedCar: initialState.selectedCar,
                selectedCity: initialState.selectedCity,
                selectedOrderStatus: initialState.selectedOrderStatus,
                lastViewedPage: 0,
            };
        default:
            return state;
    }
};
