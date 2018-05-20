import { createReducer, completeReducer, completeState } from 'redux-recompose';
import Immutable from 'seamless-immutable';

import { actions } from './actions';

const stateDescription = {
  subjects: null
};

const initialState = completeState(stateDescription);

const reducerDescription = {
  primaryActions: [actions.GET_ALL_SUBJECTS]
};

export default createReducer(Immutable(initialState), completeReducer(reducerDescription));