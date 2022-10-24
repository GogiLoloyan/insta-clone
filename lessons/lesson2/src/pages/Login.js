import React, { useContext, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import * as ROUTES from "../constants/routes";
import { FirebaseContext } from "../context/firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// import { useSiteTitle } from "../hooks/useSiteTitle";

const Login = () => {
    // useSiteTitle("Login");
    // const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [error, setError] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const invalid = email === "" || password === "";

    const handleSubmit = (event) => {
        event.preventDefault();

        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img
                    src="/images/iphone-with-profile.jpg"
                    alt="iPhone with Instagram app"
                />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                    <h1 className="flex justify-center w-full">
                        <img
                            src="/images/logo.png"
                            alt="Instagram"
                            className="mt-2 w-6/12 mb-4"
                        />
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
                            disabled={invalid}
                            type="submit"
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${invalid ? " opacity-50" : ""
                                }`}
                        >
                            Log In
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                    <p className="text-sm">
                        Don't have an account?{" "}
                        {/* <Link to={ROUTES.SIGN_UP} className="font-bold">
                            Sign up
                        </Link> */}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;