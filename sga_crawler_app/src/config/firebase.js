import firebase from 'firebase/app';
import 'firebase/database';

import { FirebaseConfig } from './keys';

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
const subjectsRef = databaseRef.child('subjects');

export const fetchSubjectByCode = (code, func) =>
  subjectsRef
    .orderByChild('subj_code')
    .equalTo(code)
    .on('child_added', snapshot => {
      func(snapshot.val());
    });
export const fetchAllSubjectNames = func =>
  subjectsRef.on('value', snapshot => {
    const names = [];
    snapshot.forEach(subject => {
      names.push(subject.child('subj_name').val());
    });
    func(names);
  });

export const fetchAllSubjectNamesWithCode = func =>
  subjectsRef.on('value', snapshot => {
    const subjs = [];
    snapshot.forEach(subject => {
      subjs.push({
        subj_name: subject.child('subj_name').val(),
        subj_code: subject.child('subj_code').val()
      });
    });
    func(subjs);
  });

// export const fetchSubjects = func =>
//   subjectsRef.on('value', snapshot => {
//     func(snapshot.val());
//   });
