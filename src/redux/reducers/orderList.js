import {
    GET_CITY_LIST,
    GET_MODEL_LIST,
    GET_STATUS_LIST,
    SET_PERIOD,
    SET_SELECTED_CITY,
    SET_SELECTED_MODEL,
    SET_SELECTED_STATUS,
} from "../types";

const initialState = {
    periodList: [
        { name: "Неважно", id: "noMatter" },
        { name: "За неделю", id: "week" },
        { name: "За месяц", id: "month" },
        { name: "За полгода", id: "halfYear" },
        { name: "За год", id: "fullYear" },
    ],
    modelList: [{ name: "Неважно", id: "noMatter" }],
    cityList: [{ name: "Неважно", id: "noMatter" }],
    statusList: [{ name: "Неважно", id: "noMatter" }],
    selectedPeriod: { name: "Неважно", id: "noMatter" },
    selectedModel: { name: "Неважно", id: "noMatter" },
    selectedCity: { name: "Неважно", id: "noMatter" },
    selectedStatus: { name: "Неважно", id: "noMatter" },
};

export const orderList = (state = initialState, action) => {
    switch (action.type) {
        case GET_MODEL_LIST:
            return {
                ...state,
                modelList: state.modelList.concat(action.payload),
            };
        case GET_CITY_LIST:
            return {
                ...state,
                cityList: state.cityList.concat(action.payload),
            };
        case GET_STATUS_LIST:
            return {
                ...state,
                statusList: state.statusList.concat(action.payload),
            };
        case SET_PERIOD:
            return { ...state, selectedPeriod: action.payload };
        case SET_SELECTED_MODEL:
            return { ...state, selectedModel: action.payload };
        case SET_SELECTED_CITY:
            return { ...state, selectedCity: action.payload };
        case SET_SELECTED_STATUS:
            return { ...state, selectedStatus: action.payload };

        default:
            return state;
    }
};
