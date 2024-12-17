import React, { useState } from "react";
import Button from "@components/common/Button";
import { AppAuthPage } from "./Custom";
import supabase from "../../utils/supabaseClient";

function Register({ onChange }: AppAuthPage) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        onChange();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: username,
                    },
                },
            });
            if (error & !data) {
                // todo: include toaster
            } else {
                // return as usual
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form>
            <div className="m-4 font-medium text-medium">Register here</div>
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
                    autoComplete="email"
                    type="email"
                    required
                    placeholder="john@yourdomain.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="m-4">
                <label
                    htmlFor="username"
                    className="block text-sm  text-left font-medium text-gray-70"
                >
                    Username
                </label>
                <input
                    className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-none focus:outline-none w-[325px]"
                    id="username"
                    name="username"
                    autoComplete="username"
                    type="text"
                    required
                    placeholder="John Doe"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="m-4">
                <label
                    htmlFor="current-password"
                    className="block text-sm text-left font-medium text-gray-70"
                >
                    Password
                </label>
                <input
                    className="mt-1 block p-2 border-b-[0.5px] border-light-black focus:border-none focus:outline-none w-[325px]"
                    id="password"
                    name="current-password"
                    type="password"
                    required
                    placeholder="*********"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex flex-row justify-center mt-8">
                <Button onClick={handleSubmit} theme="light" content="Register" />
            </div>
        </form>
    );
}

export default Register;
