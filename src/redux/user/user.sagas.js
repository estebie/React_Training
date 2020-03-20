import { takeLatest, put, all, call } from 'redux-saga/effects';

import userActionTypes from './user.types';

import { signInSuccess, signInFailure, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.actions';

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();

        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* onGoogleSighInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {

    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAtuhenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);

    } catch (error) {
        signInFailure(error.message);
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAtuhenticated);
}

export function* userSignout() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error.message));
    }
}

export function* onSignOut() {
    yield takeLatest(userActionTypes.SiGN_OUT_START, userSignout);
}

export function* userSignUp({ payload: { email, password, displayName } }) {
    console.log({ email, password, displayName });
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));

    } catch (error) {
        yield put(signUpFailure(error.message));
    }
}

export function* onUserSignUp() {
    yield takeLatest(userActionTypes.SIGN_UP_START, userSignUp);
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* userSagas() {
    yield all([
        call(onGoogleSighInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOut),
        call(onUserSignUp),
        call(onSignUpSuccess)
    ]);
}