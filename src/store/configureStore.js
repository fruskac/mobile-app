// Redux Store Configuration
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState: Object) => {
  const middleware = applyMiddleware(sagaMiddleware);

  return createStore(rootReducer, initialState, middleware);
};

export default configureStore;
