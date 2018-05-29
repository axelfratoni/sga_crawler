import firebase from 'firebase/app';
import 'firebase/database';

import { FirebaseConfig } from './keys';

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const subjectsRef = databaseRef.child('subjects');

export const fetchSubjects = func =>
  subjectsRef.on('value', snapshot => {
    func(snapshot.val());
  });
