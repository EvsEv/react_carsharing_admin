import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./redux/reducers/root";
import App from "./components/App";
import "./index.css";
import thunk from "redux-thunk";
import { refreshToken } from "./redux/middleware/refreshToken";

const ReactReduxDevTools =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
        : null;

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk, refreshToken), ReactReduxDevTools)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
