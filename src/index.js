import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./redux/reducers/root";
import App from "./components/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import thunk from "redux-thunk";
import { refreshToken } from "./redux/middleware/refreshToken";

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk, refreshToken))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
