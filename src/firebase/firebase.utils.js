import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAf31NkUGYxS-aIWl_o-I3JRpyu8XQ-Xqs",
    authDomain: "crwn-db-f3a6a.firebaseapp.com",
    databaseURL: "https://crwn-db-f3a6a.firebaseio.com",
    projectId: "crwn-db-f3a6a",
    storageBucket: "crwn-db-f3a6a.appspot.com",
    messagingSenderId: "146896721477",
    appId: "1:146896721477:web:2b7f8559e321955416b52c"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;