import { fetchDataWithComplexParamters } from "../../api/fetch";
import {
    addSelectedPeriodToStore,
    addSelectedCarToStore,
    addSelectedCityToStore,
    addSelectedOrderStatusToStore,
    changeLastViewedPageInStore,
    changeCountOfPagesInStore,
    resetSettings,
    getFilteredOrderListToStore,
} from "../actionCreators/orderList";
import { setErrorOfLoggedAuth } from "./auth";

export const setSelectedPeriod = (selectedPeriod) => (dispatch) =>
    dispatch(addSelectedPeriodToStore(selectedPeriod));

export const setSelectedCar = (selectedCar) => (dispatch) =>
    dispatch(addSelectedCarToStore(selectedCar));

export const setSelectedCity = (selectedCity) => (dispatch) =>
    dispatch(addSelectedCityToStore(selectedCity));

export const setSelectedOrderStatus = (selectedStatus) => (dispatch) =>
    dispatch(addSelectedOrderStatusToStore(selectedStatus));

export const calculateCountOfPages = (count) => {
    const pages = count % 5 ? Math.floor(count / 5) : count / 5 - 1;
    return changeCountOfPagesInStore(pages);
};

export const getFilteredOrderList = () => {
    return async (dispatch, getState) => {
        const {
            selectedCar,
            selectedCity,
            selectedPeriod,
            selectedOrderStatus,
            lastViewedPage,
        } = getState().orderList;
        let currentDate = new Date();
        let dateFrom = new Date();

        const parameters = [
            "sort[createdAt]=-1",
            "&limit=5",
            `&page=${lastViewedPage}`,
        ];
        if (selectedCar.id !== "noMatter") {
            parameters.push(`&carId[id]=${selectedCar.id}`);
        }
        if (selectedCity.id !== "noMatter") {
            parameters.push(`&cityId[id]=${selectedCity.id}`);
        }

        if (selectedOrderStatus.id !== "noMatter") {
            parameters.push(`&orderStatusId[id]=${selectedOrderStatus.id}`);
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
                break;
            case "halfYear":
                dateFrom.setMonth(dateFrom.getMonth() - 6);
                parameters.push(
                    `&dateFrom[$gt]=${dateFrom.getTime()}&dateFrom[$lt]=${currentDate.getTime()}`
                );
                break;
            case "fullYear":
                dateFrom.setYear(dateFrom.getFullYear() - 1);
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
        if (orderListFromServer.code) {
            return dispatch(setErrorOfLoggedAuth(orderListFromServer.code));
        }
        dispatch(calculateCountOfPages(orderListFromServer.count));
        dispatch(getFilteredOrderListToStore(orderListFromServer.data));
        dispatch(setErrorOfLoggedAuth(null));
    };
};

export const changeLastViewedPage = (page) => (dispatch) => {
    dispatch(changeLastViewedPageInStore(page));
    dispatch(getFilteredOrderList());
};

export const resetAndUpdateFilteredOrderList = () => (dispatch) => {
    dispatch(resetSettings());
    dispatch(getFilteredOrderList());
};
