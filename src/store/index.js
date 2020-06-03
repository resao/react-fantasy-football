import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/";
import thunk from "redux-thunk";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
