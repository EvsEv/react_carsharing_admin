import { fetchDataWithComplexParamters } from "../../api/fetch";
import {
    addMaxPriceToStore,
    addMinPriceToStore,
    addSelectedCarModelToStore,
    addSelectedCategoryToStore,
    changeCountOfPagesInStore,
    changeLastViewedPageInStore,
    getFilteredCarsTableToStore,
    resetSettings,
} from "../actionCreators/carsTable";
import { setErrorOfLoggedAuth } from "./auth";

export const setSelectedCategory = (selectedCategory) => (dispatch) =>
    dispatch(addSelectedCategoryToStore(selectedCategory));

export const setSelectedCarModel = (selectedCarModel) => (dispatch) =>
    dispatch(addSelectedCarModelToStore(selectedCarModel));

export const setMinPrice = (price) => (dispatch) =>
    dispatch(addMinPriceToStore(Number(price)));

export const setMaxPrice = (price) => (dispatch) =>
    dispatch(addMaxPriceToStore(Number(price)));

const calculateCountOfPages = (count) => {
    const pages = count % 7 ? Math.floor(count / 7) : count / 7 - 1;
    return changeCountOfPagesInStore(pages);
};

export const getFilteredCarsTable = () => {
    return async (dispatch, getState) => {
        const {
            selectedCarModel,
            selectedCategory,
            priceMin,
            priceMax,
            lastViewedPage,
        } = getState().carsTable;

        const parameters = [
            "sort[createdAt]=-1",
            "&limit=7",
            `&page=${lastViewedPage}`,
        ];

        if (selectedCarModel?.id !== "noMatter") {
            parameters.push(`&id=${selectedCarModel.id}`);
        }

        if (selectedCategory?.id !== "noMatter") {
            parameters.push(`&categoryId[id]=${selectedCategory.id}`);
        }

        if (priceMin) {
            parameters.push(`&priceMin[$gt]=${priceMin}`);
        }

        if (priceMax) {
            parameters.push(`&priceMax[$lt]=${priceMax}`);
        }

        const carsTableFromServer = await fetchDataWithComplexParamters(
            "car",
            parameters.join("")
        );

        if (carsTableFromServer.code) {
            return dispatch(setErrorOfLoggedAuth(carsTableFromServer.code));
        }

        dispatch(calculateCountOfPages(carsTableFromServer.count));
        dispatch(getFilteredCarsTableToStore(carsTableFromServer.data));
        dispatch(setErrorOfLoggedAuth(null));
    };
};

export const changeLastViewedPage = (page) => (dispatch) => {
    dispatch(changeLastViewedPageInStore(page));
    dispatch(getFilteredCarsTable());
};

export const resetAndUpdateFilteredCarsTable = () => (dispatch) => {
    dispatch(resetSettings());
    dispatch(getFilteredCarsTable());
};
