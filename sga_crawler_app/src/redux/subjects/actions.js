import { completeTypes, createTypes } from 'redux-recompose';

import UserService from '../../Services/UserService';

export const actions = createTypes(completeTypes(['GET_ALL_SUBJECTS']), '@@SUBJECTS');

const ActionCreators = {
  subjects: () => ({
    type: actions.GET_ALL_SUBJECTS,
    target: 'subjects',
    service: UserService.books
  })
};

export default ActionCreators;