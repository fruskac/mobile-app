import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createReduxContainer, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { AppNavigator } from '../navigation/Navigation';
import appReducer from './reducers/appReducer';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)

const navigationWithReduxMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
);

const middlewares = [navigationWithReduxMiddleware, thunk];
const middleware = applyMiddleware(...middlewares);
const composeEnhancers = composeWithDevTools({ suppressConnectErrors: false });

const App = createReduxContainer(AppNavigator);
const mapStateToProps = (state) => ({
    state: state.nav
});
export const AppWithNavigationState = connect(mapStateToProps)(App);

export const store = createStore(
    persistedReducer,
    composeEnhancers(middleware),
);

export const persistor = persistStore(store);