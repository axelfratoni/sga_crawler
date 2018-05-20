import { subjectsRef } from '../../config/firebase';

export const FETCH_SUBJECTS = 'FETCH_SUBJECTS';

// export const addToDo = newToDo => async dispatch => {
//   todosRef.push().set(newToDo);
// };

// export const completeToDo = completeToDoId => async dispatch => {
//   todosRef.child(completeToDoId).remove();
// };

export const fetchSubjects = () => async dispatch => {
    subjectsRef.on('value', snapshot => {
        dispatch({
            type: FETCH_SUBJECTS,
            payload: snapshot.val()
        });
    });
};
