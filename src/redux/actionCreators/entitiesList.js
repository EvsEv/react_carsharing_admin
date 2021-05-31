import {
    CHANGE_PAGE_ENTITIES_LIST,
    SET_COUNT_OF_PAGES_OF_ENTITIES_LIST,
    SET_FILTERED_LIST_OF_SELECTED,
    SET_OTHER_ENTITIES,
    SET_SELECTED_ENTITY,
} from "../types";

export const addOtherEntitiesToStore = (otherEntities) => ({
    type: SET_OTHER_ENTITIES,
    payload: otherEntities,
});

export const addSelectedEntityToStore = (entity) => ({
    type: SET_SELECTED_ENTITY,
    payload: entity,
});

export const changePageEntitiesListToStore = (page) => ({
    type: CHANGE_PAGE_ENTITIES_LIST,
    payload: page,
});

export const setAllPagesEntitiesListToStore = (count) => ({
    type: SET_COUNT_OF_PAGES_OF_ENTITIES_LIST,
    payload: count,
});

export const addFilteredEntityList = (filteredList) => ({
    type: SET_FILTERED_LIST_OF_SELECTED,
    payload: filteredList,
});
