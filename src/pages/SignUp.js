import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { addDoc, getDocs, collection, query, where } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import InstaLogo from "../components/InstaLogo";
import InstaBaner from "../components/InstaBaner";
import { useSiteTitle } from "../hooks/useSiteTitle";
import { FirebaseContext } from "../context/firebase";

const SignUp = () => {
    useSiteTitle("Sign Up");
    const navigate = useNavigate();
    const { db } = useContext(FirebaseContext);

    const [error, setError] = useState("");

    const [userName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 1 --- check is user by userName already exist
        const q = query(collection(db, "users"), where("username", "==", userName));
        const querySnapshot = await getDocs(q);
        const doesExistUser = !querySnapshot.empty;

        if (doesExistUser) {
            setError("User name allredy exist");
            return;
        }

        try {
            // 2 --- create user by email and password (this is just for authentication)
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // 3 --- update user displayName
            await updateProfile(userCredential.user, {
                displayName: userName,
            })

            // 4 --- create user in users collection
            await addDoc(collection(db, 'users'), {
                userId: userCredential.user.uid,
                username: userName,
                fullName,
                emailAddress: email.toLowerCase(),
                following: [],
                followers: [],
                dateCreated: Date.now(),
            })

            // 5 --- if all ok, then go to login for login with new user
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    const invalidForm =
        email === "" || password === "" || userName === "" || fullName === "";

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
                            aria-label="Enter your user name"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="text"
                            placeholder="User name"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                        />
                        <input
                            aria-label="Enter your full name"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
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
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                    <p className="text-sm">
                        Have an account?{" "}
                        <Link to={"/login"} className="font-bold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;