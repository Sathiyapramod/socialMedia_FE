import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Login from "./Login";

import Logo from "../../components/common/Logo";
import logoImage from "../../assets/logo.svg";
import Register from "./Register";

import { doSignInWithGoogle } from "../../utils/auth";
import { useAppDispatch } from "../../store";
import { setDisplayName, setToken, setEmail, setPhoto } from "../../store/reducers/auth";

function LandingForm() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [flag, setFlag] = useState<boolean>(true);

    const handleToggle = () => setFlag((pv) => !pv);

    const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { accessToken, email, displayName, photoURL } = await doSignInWithGoogle();
        dispatch(setDisplayName(displayName));
        dispatch(setEmail(email ?? ""));
        dispatch(setToken(accessToken));
        dispatch(setPhoto(photoURL ?? ""));
        navigate("/home");
    };
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <div>
                <Logo src={logoImage} />
            </div>
            <div className="text-lg">Jatayu</div>
            {flag ? (
                <Login onChange={handleToggle} handleAuth={handleGoogleSignIn} />
            ) : (
                <Register onChange={handleToggle} />
            )}
        </div>
    );
}

export default LandingForm;
