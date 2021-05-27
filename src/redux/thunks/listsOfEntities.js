import { fetchData } from "../../api/fetch";
import { setErrorOfLoggedAuthToStore } from "../actionCreators/auth";
import {
    addCarsListToStore,
    addCategoryListToStore,
    addCityListToStore,
    addOrderStatusListToStore,
    setColorListToStore,
} from "../actionCreators/listsOfEntities";

export const getCarsList = () => {
    return async (dispatch) => {
        const carsListFromServer = await fetchData("car");
        if (carsListFromServer.code) {
            return dispatch(
                setErrorOfLoggedAuthToStore(carsListFromServer.code)
            );
        }
        dispatch(addCarsListToStore(carsListFromServer));
        dispatch(setErrorOfLoggedAuthToStore(null));
    };
};

export const getCityList = () => {
    return async (dispatch) => {
        const cityListFromServer = await fetchData("city");
        if (cityListFromServer.code) {
            return dispatch(
                setErrorOfLoggedAuthToStore(cityListFromServer.code)
            );
        }
        dispatch(addCityListToStore(cityListFromServer));
        dispatch(setErrorOfLoggedAuthToStore(null));
    };
};

export const getOrderStatusList = () => {
    return async (dispatch) => {
        const statusListFromServer = await fetchData("orderStatus");

        if (statusListFromServer.code) {
            return dispatch(
                setErrorOfLoggedAuthToStore(statusListFromServer.code)
            );
        }
        dispatch(addOrderStatusListToStore(statusListFromServer));
        dispatch(setErrorOfLoggedAuthToStore(null));
    };
};

export const getCategoryList = () => {
    return async (dispatch) => {
        const categoryListFromServer = await fetchData("category");

        if (categoryListFromServer.code) {
            return dispatch(
                setErrorOfLoggedAuthToStore(categoryListFromServer.code)
            );
        }
        dispatch(addCategoryListToStore(categoryListFromServer));
        dispatch(setErrorOfLoggedAuthToStore(null));
    };
};
