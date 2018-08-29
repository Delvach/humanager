import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import ReduxSagaFirebase from 'redux-saga-firebase';

import { firebaseConfig } from '../config/keys';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const api = new ReduxSagaFirebase(firebaseApp);

export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export default api;
