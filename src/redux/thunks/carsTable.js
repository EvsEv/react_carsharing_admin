import { fetchDataWithComplexParamters } from "../../api/fetch";
import {
    addSelectedCarModelToStore,
    addSelectedCategoryToStore,
    changeCountOfPagesInStore,
    changeLastViewedPageInStore,
    getFilteredCarsTableToStore,
} from "../actionCreators/carsTable";
import { setErrorOfLoggedAuth } from "./auth";

export const setSelectedCategory = (selectedCategory) => (dispatch) =>
    dispatch(addSelectedCategoryToStore(selectedCategory));

export const setSelectedCarModel = (selectedCarModel) => (dispatch) =>
    dispatch(addSelectedCarModelToStore(selectedCarModel));

const calculateCountOfPages = (count) => {
    const pages = count % 5 ? Math.floor(count / 5) : count / 5 - 1;
    return changeCountOfPagesInStore(pages);
};

export const getFilteredCarsTable = () => {
    return async (dispatch, getState) => {
        const { selectedCarModel, selectedCategory, lastViewedPage } =
            getState().carsTable;

        const parameters = [
            "sort[createdAt]=-1",
            "&limit=5",
            `&page=${lastViewedPage}`,
        ];

        if (selectedCarModel.id !== "noMatter") {
            parameters.push(`&id=${selectedCarModel.id}`);
        }

        if (selectedCategory.id !== "noMatter") {
            parameters.push(`&categoryId[id]=${selectedCategory.id}`);
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
