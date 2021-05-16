import { fetchData } from "../../api/fetch";
import {
    addCityListToStore,
    addModelListToStore,
    addSelectedCityToStore,
    addSelectedModelToStore,
    addSelectedPeriodToStore,
    addSelectedStatusToStore,
    addStatusListToStore,
} from "../actionCreators/orderList";

export const getModelList = () => {
    return async (dispatch) => {
        const modelListFromServer = await fetchData("car");
        dispatch(addModelListToStore(modelListFromServer));
    };
};

export const getCityList = () => {
    return async (dispatch) => {
        const cityListFromServer = await fetchData("city");
        dispatch(addCityListToStore(cityListFromServer));
    };
};

export const getStatusList = () => {
    return async (dispatch) => {
        const statusListFromServer = await fetchData("orderStatus");
        const translatedStatusList = statusListFromServer.map((status) =>
            status.name === "new"
                ? { ...status, name: "Новый" }
                : status.name === "temp"
                ? { ...status, name: "В процессе" }
                : status.name === "issued"
                ? { ...status, name: "Выполненный" }
                : status.name === "confirmed"
                ? { ...status, name: "Подтвержденный" }
                : status.name === "cancelled"
                ? { ...status, name: "Отменненый" }
                : null
        );
        dispatch(addStatusListToStore(translatedStatusList));
    };
};

export const setSelectedPeriod = (selectedPeriod) => (dispatch) =>
    dispatch(addSelectedPeriodToStore(selectedPeriod));

export const setSelectedModel = (selectedModel) => (dispatch) =>
    dispatch(addSelectedModelToStore(selectedModel));

export const setSelectedCity = (selectedCity) => (dispatch) =>
    dispatch(addSelectedCityToStore(selectedCity));

export const setSelectedStatus = (selectedStatus) => (dispatch) =>
    dispatch(addSelectedStatusToStore(selectedStatus));
