import "regenerator-runtime/runtime";
// Redux Store Configuration
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "remote-redux-devtools";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({ suppressConnectErrors: false });
const middleware = applyMiddleware(sagaMiddleware);

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["cache"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const initialState = {};

export const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(middleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// persistor.purge();
