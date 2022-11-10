import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { addDoc, getDocs, collection, query, where } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import InstaLogo from "../components/InstaLogo";
import InstaBaner from "../components/InstaBaner";
import { useSiteTitle } from "../hooks/useSiteTitle";
import { FirebaseContext } from "../context/firebase";

import * as ROUTES from '../constants/routes'

const SignUp = () => {
    useSiteTitle("Sign Up");
    const navigate = useNavigate();
    const { db } = useContext(FirebaseContext);

    const [error, setError] = useState("");

    const [userFields, setUserFields] = useState({
        userName: "",
        fullName: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 1 --- check is user by userName already exist
        const q = query(collection(db, "users"), where("username", "==", userFields.userName));
        const querySnapshot = await getDocs(q);
        const doesExistUser = !querySnapshot.empty;

        if (doesExistUser) {
            setError("User name allredy exist");
            return;
        }

        try {
            // 2 --- create user by email and password (this is just for authentication)
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, userFields.email, userFields.password);

            // 3 --- update user displayName
            await updateProfile(userCredential.user, {
                displayName: userFields.userName,
            })

            // 4 --- create user in users collection
            await addDoc(collection(db, 'users'), {
                userId: userCredential.user.uid,
                username: userFields.userName,
                fullName: userFields.fullName,
                emailAddress: userFields.email.toLowerCase(),
                following: [],
                followers: [],
                dateCreated: Date.now(),
            })

            // 5 --- if all ok, then go to login for login with new user
            navigate(ROUTES.LOGIN);
        } catch (err) {
            setError(err.message);
        }
    };

    const changeFiled = (event) => setUserFields((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))

    const invalidForm = Object.values(userFields).some(value => !value)

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
                            name="userName"
                            aria-label="Enter your user name"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="text"
                            placeholder="User name"
                            value={userFields.userName}
                            onChange={changeFiled}
                        />
                        <input
                            name="fullName"
                            aria-label="Enter your full name"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="text"
                            placeholder="Full name"
                            value={userFields.fullName}
                            onChange={changeFiled}
                        />
                        <input
                            name="email"
                            aria-label="Enter your email address"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="email"
                            placeholder="Email address"
                            value={userFields.email}
                            onChange={changeFiled}
                        />
                        <input
                            name="password"
                            aria-label="Enter your password"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="password"
                            placeholder="Password"
                            value={userFields.password}
                            onChange={changeFiled}
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
                        <Link to={ROUTES.LOGIN} className="font-bold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;