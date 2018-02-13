import "regenerator-runtime/runtime";
// Redux Store Configuration
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "remote-redux-devtools";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState: Object) => {
  const composeEnhancers = composeWithDevTools({ realtime: true });
  const middleware = applyMiddleware(sagaMiddleware);

  const persistConfig = {
    key: "root",
    storage
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(middleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
