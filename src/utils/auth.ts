import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider,
    getAuth,
    updateProfile,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (emailId: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, emailId, password);
    const user = result.user;
    const { accessToken, email, displayName } = user as {
        accessToken?: string;
        email?: string;
        displayName?: string;
    };
    return { accessToken, email, displayName };
};

export const updateUserName = async (username: string) => {
    const auth = getAuth();
    console.log(auth.currentUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const status = await updateProfile(auth.currentUser, {
        displayName: username,
    });
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user);
    const { accessToken, email, displayName, photoURL } = user as {
        accessToken?: string;
        email?: string;
        displayName?: string;
        photoURL?: string;
    };
    return { accessToken, email, displayName, photoURL };
};

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
    return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};
