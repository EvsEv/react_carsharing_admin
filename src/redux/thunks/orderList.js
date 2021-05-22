import { fetchData, fetchDataWithComplexParamters } from "../../api/fetch";
import {
    addCityListToStore,
    addModelListToStore,
    addOrderListToStore,
    addSelectedCityToStore,
    addSelectedModelToStore,
    addSelectedPeriodToStore,
    addSelectedStatusToStore,
    addStatusListToStore,
    changeCountOfPagesInStore,
    changeLastViewedPageInStore,
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

export const calculateCountOfPages = (count) => {
    const pages = count % 5 ? Math.floor(count / 5) : count / 5 - 1;
    return changeCountOfPagesInStore(pages);
};

export const getOrderList = () => {
    return async (dispatch, getState) => {
        const {
            selectedModel,
            selectedCity,
            selectedPeriod,
            selectedStatus,
            lastViewedPage,
        } = getState().orderList;
        let currentDate = new Date();
        let dateFrom = new Date();

        console.log(lastViewedPage);

        const parameters = [
            "sort[dateFrom]=-1",
            "&limit=5",
            `&page=${lastViewedPage}`,
        ];
        if (selectedModel.id !== "noMatter") {
            parameters.push(`&carId[id]=${selectedModel.id}`);
        }
        if (selectedCity.id !== "noMatter") {
            parameters.push(`&cityId[id]=${selectedCity.id}`);
        }

        if (selectedStatus.id !== "noMatter") {
            parameters.push(`&orderStatusId[id]=${selectedStatus.id}`);
        }
        switch (selectedPeriod.id) {
            case "day":
                dateFrom.setDate(currentDate.getDate() - 1);
                parameters.push(
                    `&dateFrom[$gt]=${dateFrom.getTime()}&dateFrom[$lt]=${currentDate.getTime()}`
                );
                break;
            case "week":
                dateFrom.setDate(currentDate.getDate() - 7);
                parameters.push(
                    `&dateFrom[$gt]=${dateFrom.getTime()}&dateFrom[$lt]=${currentDate.getTime()}`
                );
                break;
            case "month":
                dateFrom.setMonth(dateFrom.getMonth() - 1);
                parameters.push(
                    `&dateFrom[$gt]=${dateFrom.getTime()}&dateFrom[$lt]=${currentDate.getTime()}`
                );

            case "halfYear":
                dateFrom.setMonth(dateFrom.getMonth() - 6);
                parameters.push(
                    `&dateFrom[$gt]=${dateFrom.getTime()}&dateFrom[$lt]=${currentDate.getTime()}`
                );
                break;
            case "fullYear":
                dateFrom.setMonth(dateFrom.getFullYear() - 1);
                parameters.push(
                    `&dateFrom[$gt]=${dateFrom.getTime()}&dateFrom[$lt]=${currentDate.getTime()}`
                );
                break;
            default:
                break;
        }

        dateFrom.setHours(0);
        dateFrom.setMinutes(0);
        dateFrom.setSeconds(0);

        const orderListFromServer = await fetchDataWithComplexParamters(
            "order",
            parameters.join("")
        );
        dispatch(calculateCountOfPages(orderListFromServer.count));
        dispatch(addOrderListToStore(orderListFromServer.data));
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

export const changeLastViewedPage = (page) => (dispatch) => {
    dispatch(changeLastViewedPageInStore(page));
    dispatch(getOrderList());
};
