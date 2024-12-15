import React, { useState } from "react";
import auth from "../../utils/firebase.ts";

import { signInWithEmailAndPassword } from "firebase/auth";

function Custom() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                const user = userCred.user;
                // navigate("/home")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };
    return (
        <form action="">
            <div className="m-4">
                <label
                    htmlFor="email-address"
                    className="block text-left text-sm font-medium text-gray-70"
                >
                    Email address
                </label>
                <input
                    id="email-address"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    name="email"
                    type="email"
                    required
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="m-4">
                <label
                    htmlFor="password"
                    className="block text-sm  text-left font-medium text-gray-70"
                >
                    Password
                </label>
                <input
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleSubmit}>Log in</button>
        </form>
    );
}

export default Custom;
