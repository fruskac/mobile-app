// Redux Store Configuration
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "remote-redux-devtools";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState: Object) => {
  const middleware = applyMiddleware(sagaMiddleware);

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(middleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
