import { setUserTokensToStore } from "../actionCreators/auth";

export const setUserTokens = (tokens) => {
    return (dispatch) => dispatch(setUserTokensToStore(tokens));
};
