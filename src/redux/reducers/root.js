import { combineReducers } from "redux";
import { auth } from "./auth";
import { listsOfEntities } from "./listsOfEntities";
import { orderList } from "./orderList";
import { carsTable } from "./carsTable";

export const rootReducer = combineReducers({
    auth,
    listsOfEntities,
    orderList,
    carsTable,
});
