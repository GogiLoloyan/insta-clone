import React from "react";

// 1. add functionality to the form
// 2. validation password, min 6 symbol
// 3. Tailwind css learn

const Login = () => {
    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                {/* <img
                    src="/images/iphone-with-profile.jpg"
                    alt="iPhone with Instagram app"
                /> */}
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                    <h1 className="flex justify-center w-full">
                        {/* <img
                            src="/images/logo.png"
                            alt="Instagram"
                            className="mt-2 w-6/12 mb-4"
                        /> */}
                    </h1>

                    <form>
                        <input
                            aria-label="Enter your email address"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="email"
                            placeholder="Email address"
                        />
                        <input
                            aria-label="Enter your password"
                            className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
                            type="password"
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            className={`bg-blue-500 text-white w-full rounded h-8 font-bold `}
                        >
                            Log In
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
                    <p className="text-sm">
                        Don't have an account?{" "}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;