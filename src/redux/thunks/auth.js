import { authUser } from "../../api/fetch";
import { isAuthUser } from "../actionCreators/auth";
import { addMailToStore } from "../actionCreators/auth";

export const authorizeUser = (mail) => {
    return (dispatch) => {
        authUser();
        dispatch(isAuthUser(true));
        dispatch(addMailToStore(mail));
    };
};
