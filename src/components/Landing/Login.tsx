import React, { useState } from "react";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../utils/auth";
import { useAppDispatch } from "../../store/index";
import { setDisplayName, setToken, setEmail } from "../../store/reducers/auth";

export interface AppAuthPage {
    onChange: () => void;
    handleAuth?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

function Login({ onChange, handleAuth }: AppAuthPage) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [userEmail, setUserEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        if (userEmail === "" || password === "") {
            // todo - introduce toaster
        } else {
            e.preventDefault();
            const { accessToken, email, displayName } = await doSignInWithEmailAndPassword(
                userEmail,
                password
            );
            dispatch(setDisplayName(displayName));
            dispatch(setEmail(email ?? ""));
            dispatch(setToken(accessToken));
            navigate("/home");
        }
    };
    return (
        <form>
            <div className="m-4">
                <label
                    htmlFor="email-address"
                    className="block text-left text-sm font-medium text-gray-70"
                >
                    Email Id
                </label>
                <input
                    id="email-address"
                    className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-none focus:outline-none w-[325px]"
                    name="email"
                    type="email"
                    required
                    placeholder="john@yourdomain.com"
                    onChange={(e) => setUserEmail(e.target.value)}
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
                    className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-none focus:outline-none w-[325px]"
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="*********"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex flex-row-reverse m-4">
                <div
                    className="text-light-gray font-sm hover:underline hover:underline-offset-4 cursor-pointer"
                    onClick={onChange}
                >
                    New User ? Register Here
                </div>
            </div>
            <div className="flex flex-row justify-center mb-8">
                <Button onClick={handleSubmit} theme="light" content="Login" />
            </div>
            <div className="relative">
                <span className="block w-full h-px bg-light-gray"></span>
                <p className="inline-block w-fit bg-white px-2 absolute -top-2 inset-x-0 mx-auto font-sm text-light-gray">
                    Or Continue with
                </p>
            </div>
            <div className="flex flex-row justify-center mb-8">
                <Button
                    onClick={handleAuth}
                    theme="dark"
                    content=" Sign in with Google"
                    classname="w-full mt-8"
                />
            </div>
        </form>
    );
}

export default Login;
