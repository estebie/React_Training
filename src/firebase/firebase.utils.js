import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBqiSHQDIHX7pb6kcIbtFrnn8J6FOGpSSc",
    authDomain: "crwn-db-b2b07.firebaseapp.com",
    databaseURL: "https://crwn-db-b2b07.firebaseio.com",
    projectId: "crwn-db-b2b07",
    storageBucket: "crwn-db-b2b07.appspot.com",
    messagingSenderId: "694512399780",
    appId: "1:694512399780:web:bc8edd5217bbaf4504fd31"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;