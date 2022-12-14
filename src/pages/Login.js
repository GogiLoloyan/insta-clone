import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import InstaLogo from "../components/InstaLogo";
import InstaBaner from "../components/InstaBaner";
import { useSiteTitle } from "../hooks/useSiteTitle";

import * as ROUTES from '../constants/routes'

const Login = () => {
    useSiteTitle("Login");
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const invalidForm = useMemo(() => {
        return email === "" || password === "";
    }, [email, password])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // 1 --- login by email and password
            const authentication = getAuth();
            const data = await signInWithEmailAndPassword(authentication, email, password);

            // 2 --- if login is ok, then navigate to dashboard
            navigate(ROUTES.PROFILE.replace(ROUTES.PROFILE_USER_NAME_PARAM, data.user.displayName))
        } catch (err) {
            // 3 --- if login fail, then show error message
            setError(err.message);
        }
    };

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <InstaBaner />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                    <h1 className="flex justify-center w-full">
                        <InstaLogo />
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            aria-label="Enter your email address"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input
                            aria-label="Enter your password"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        {error && <p className="text-red-500 text-center my-3">{error}</p>}
                        <button
                            disabled={invalidForm}
                            type="submit"
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${invalidForm ? " opacity-50" : ""
                                }`}
                        >
                            Log In
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                    <p className="text-sm" onClick={() => navigate('/signup')}>
                        Don't have an account?{" "}
                        <Link to={ROUTES.SIGN_UP} className="font-bold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;