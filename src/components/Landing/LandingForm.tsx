import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Login from "./Login";

import Logo from "@components/common/Logo";
import logoImage from "@assets/logo.svg";
import Register from "./Register";
import supabase from "../../utils/supabaseClient";

function LandingForm() {
    const navigate = useNavigate();

    const [flag, setFlag] = useState<boolean>(true);

    const handleToggle = () => setFlag((pv) => !pv);

    const handleGoogleSignIn = async () => {
        try {
            const content = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    scopes: "",
                    redirectTo: import.meta.env.VITE_APP_HOME_PAGE_URL,
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                    },
                },
            });

            if (!content) {
                console.error("Error signing in:", error);
            } else {
                navigate("/home");
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    };

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <div>
                <Logo src={logoImage} />
            </div>
            <div className="text-lg">App Name</div>
            {flag ? (
                <Login onChange={handleToggle} handleAuth={handleGoogleSignIn} />
            ) : (
                <Register onChange={handleToggle} />
            )}
        </div>
    );
}

export default LandingForm;
