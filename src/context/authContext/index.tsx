import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../../utils/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, initialUser);

        return unSubscribe;
    }, []);

    async function initialUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = [currentUser, userLoggedIn, loading];

    return <AuthContext.Provider value={value}>{!loading && children} </AuthContext.Provider>;
}
