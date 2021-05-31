import {
    SET_OTHER_ENTITIES,
    SET_SELECTED_ENTITY,
    CHANGE_PAGE_ENTITIES_LIST,
    SET_COUNT_OF_PAGES_OF_ENTITIES_LIST,
    SET_FILTERED_LIST_OF_SELECTED,
} from "../types";

const initialState = {
    otherEntities: [],
    selectedEntity: null,
    filteredListBySelected: [],
    lastViewedPage: 0,
    countOfAllPages: null,
};

export const entitiesList = (state = initialState, action) => {
    switch (action.type) {
        case SET_OTHER_ENTITIES:
            return { ...state, otherEntities: action.payload };
        case SET_SELECTED_ENTITY:
            return { ...state, selectedEntity: action.payload };
        case CHANGE_PAGE_ENTITIES_LIST:
            return { ...state, lastViewedPage: action.payload };
        case SET_COUNT_OF_PAGES_OF_ENTITIES_LIST:
            return { ...state, countOfAllPages: action.payload };
        case SET_FILTERED_LIST_OF_SELECTED:
            return { ...state, filteredListBySelected: action.payload };
        default:
            return state;
    }
};
