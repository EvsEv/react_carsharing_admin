import { getEntity } from "../../api/getEntity";
import { addCarEntityToStore } from "../actionCreators/mainEntities";
import { setErrorOfLoggedAuth } from "./auth";

export const getCarEntity = () => async (dispatch) => {
    const responsedEntity = await getEntity("car");

    if (responsedEntity.code) {
        return dispatch(setErrorOfLoggedAuth(responsedEntity.code));
    }

    dispatch(setErrorOfLoggedAuth(null));
    dispatch(addCarEntityToStore(responsedEntity));
};
