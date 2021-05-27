import { GET_CITY_LIST, GET_CARS_LIST, GET_ORDER_STATUS_LIST } from "../types";

const initialState = {
    periodList: [
        { name: "Неважно", id: "noMatter" },
        { name: "За день", id: "day" },
        { name: "За неделю", id: "week" },
        { name: "За месяц", id: "month" },
        { name: "За полгода", id: "halfYear" },
        { name: "За год", id: "fullYear" },
    ],
    carsList: [{ name: "Неважно", id: "noMatter" }],
    cityList: [{ name: "Неважно", id: "noMatter" }],
    orderStatusList: [{ name: "Неважно", id: "noMatter" }],
};

export const listsOfEntities = (state = initialState, action) => {
    switch (action.type) {
        case GET_CARS_LIST:
            return {
                ...state,
                carsList: [state.carsList[0]].concat(action.payload),
            };
        case GET_CITY_LIST:
            return {
                ...state,
                cityList: [state.cityList[0]].concat(action.payload),
            };
        case GET_ORDER_STATUS_LIST:
            return {
                ...state,
                orderStatusList: [state.orderStatusList[0]].concat(
                    action.payload
                ),
            };
        default:
            return state;
    }
};
