import "regenerator-runtime/runtime";
// Redux Store Configuration
import { createStore, applyMiddleware, compose } from "redux";

import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);

const persistConfig = {
  key: "root_v2",
  storage: AsyncStorage,
  blacklist: ["cache", "nav"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const initialState = {};

export const store = createStore(
  persistedReducer,
  initialState,
  compose(middleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// persistor.purge();
