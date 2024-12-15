import React, { useEffect, useState } from "react";
import auth from "../../utils/firebase.ts";

import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import Custom from "./Custom";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/plus.login"); // This might help in some cases

function LandingForm() {
    const [user, setUser] = useState<string | null>(null);
    console.log(user);
    const handleGoogleSignIn = async () => {
        try {
            const userCred = await signInWithPopup(auth, provider);
            const user = userCred.user;
            console.log(user);
            // navigate("/home");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await signOut(auth);
            console.log(res);
            // Redirect to login page
            window.location.href = "/";
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [auth]);

    return (
        <div>
            <h1>Application Name</h1>
            <Custom />
            <button onClick={handleGoogleSignIn} className="m-4 p-2 bg-red-600 text-white rounded">
                Sign in with Google
            </button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default LandingForm;
