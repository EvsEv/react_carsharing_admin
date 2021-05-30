import { getAllEntities } from "../../api/getAllEntities";
import { fetchDataWithComplexParamters } from "../../api/fetch";
import {
    addFilteredEntityList,
    addOtherEntitiesToStore,
    addSelectedEntityToStore,
    changePageEntitiesListToStore,
    setAllPagesEntitiesListToStore,
} from "../actionCreators/entitiesList";
import { setErrorOfLoggedAuth } from "./auth";

export const setSelectedEntity = (entity) => (dispatch) =>
    dispatch(addSelectedEntityToStore(entity));

const calculateCountOfPages = (count) => {
    const pages = count % 5 ? Math.floor(count / 5) : count / 5 - 1;
    return setAllPagesEntitiesListToStore(pages);
};

export const addOtherEntities = () => async (dispatch, getState) => {
    const { selectedEntity } = getState().entitiesList;
    const allEntities = await getAllEntities();
    const otherEntities = [];

    allEntities?.filter((item) => {
        if (
            item.name !== "car" &&
            item.name !== "order" &&
            item.name !== "Example" &&
            item.name !== "Prise setter"
        ) {
            otherEntities.push(item);
        }
    });

    dispatch(addOtherEntitiesToStore(otherEntities));

    if (!selectedEntity) {
        dispatch(setSelectedEntity(otherEntities[0]));
    }
};

export const getFilteredEntityList = () => async (dispatch, getState) => {
    const { lastViewedPage, selectedEntity } = getState().entitiesList;
    if (selectedEntity) {
        const parameters = [
            "sort[createdAt]=-1",
            "&limit=5",
            `&page=${lastViewedPage}`,
        ];
        const filteredList = await fetchDataWithComplexParamters(
            selectedEntity?.name,
            parameters.join(" ")
        );

        if (filteredList.code) {
            return dispatch(setErrorOfLoggedAuth(filteredList.code));
        }
        dispatch(calculateCountOfPages(filteredList.count));
        dispatch(addFilteredEntityList(filteredList.data));

        dispatch(setErrorOfLoggedAuth(null));
    }
};

export const changeLastViewedPage = (page) => (dispatch) => {
    dispatch(changePageEntitiesListToStore(page));
    dispatch(getFilteredEntityList());
};
