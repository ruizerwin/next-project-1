"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri'

export default function SignupPage() {
    //const response = await axios.post("api/users/signup", user);
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const validateData = (): boolean => {
        const err = [];
        if(data.username.length < 4) {
            err.push({usename: "Username must be atleast 4 characters long"});
        }
    }

    const [loading, setLoading] = React.useState(false);

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        
        const isValid = validateData();
        if(isValid) {

        }
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // We get the name from event.target.name and set the value from onChange in it
        // So name in out input component should be same as the property in data state

        setData({...data, [event.target.name]: event.target.value});
    }
    

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            {loading ? "Processing" : "Signup"}
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSignup}>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="text"
                                        placeholder={"Username"}
                                        value={user.username}
                                        name="username"
                                        onChange={handleInputChange}
                                        icon={<BsPerson />}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="email"
                                        placeholder={"Email"}
                                        value={user.email}
                                        name="email"
                                        onChange={handleInputChange}
                                        icon={<AiOutlineMail />}
                                        required
                                    />
                                </div>
                            </div>


                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor={"password"}
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <Link
                                            href="/recovery"
                                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>


                                <div className="mt-2">
                                    <input
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="password"
                                        placeholder={"Password"}
                                        value={user.password}
                                        name="password"
                                        onChange={handleInputChange}
                                        icon={<AiOutlineUnlock />}
                                        required
                                    />
                                </div>


                                <div className="mt-2">
                                    <input
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        type="password"
                                        placeholder={"Confirm Password"}
                                        value={user.confirmPassword}
                                        name="confirmPassword"
                                        onChange={handleInputChange}
                                        icon={<RiLockPasswordLine />}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Link href="/login">Visit login page</Link>
            </div>
        </>
    );
}
