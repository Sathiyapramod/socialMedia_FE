import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: Record<string, string> = {
    // apiKey: "AIzaSyCc1-mKQuNnstCn7uCd-ol4A6XFxf7amwA",
    // authDomain: "social-media-758cf.firebaseapp.com",
    // projectId: "social-media-758cf",
    // storageBucket: "social-media-758cf.firebasestorage.app",
    // messagingSenderId: "398289656031",
    // appId: "1:398289656031:web:00ed632219c394f66ab16a",
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MSG_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
