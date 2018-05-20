import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer as router } from 'react-router-redux';
import { fetchMiddleware } from 'redux-recompose';

import subjects from './subjects/reducer';

const reducers = combineReducers({
    router,
    subjects
});

const middlewares = [fetchMiddleware, thunk];
const enhancers = [applyMiddleware(...middlewares)];

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = (state, action) => reducers(state, action);

const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
