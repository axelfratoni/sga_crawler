import { FETCH_SUBJECTS } from './actions';

export default (state = {}, action) => {
    switch (action.type) {
    case FETCH_SUBJECTS:
        return action.payload;
    default:
        return state;
    }
};
