"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as Yup from 'yup';
import { set } from "mongoose";


/*export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            if(response.status == 200) {
                console.log("Signup sucess", response.data);
                router.push("/login");
            } else {
                throw new Error("Failed to complete process");
            }


        } catch (error:any) {
            console.log("signup failed line 34 under signup/page", error.message);
            toast.error(error.message);


        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return(
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>{loading? "Processing" : "Signup"}</h1>
                <hr />
                <label htmlFor="username">Username: </label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-gray-600 text-black"
                    id="username"
                    name="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username:e.target.value})}
                    placeholder="Username"
                />

                <label htmlFor="email">Email: </label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    name="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email:e.target.value})}
                    placeholder="Email"
                />

                <label htmlFor="password">Password: </label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password:e.target.value})}
                    placeholder="Password"
                />

                <button
                    onClick={onSignup}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                        {buttonDisabled? "No signup" : "Signup"}
                </button>

                <Link href="/login">Login Me</Link>
            </div>
        </>
    )
}*/

const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
});


const Form = () => {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [errors, setErrors] = React.useState({
        email: "",
        password: "",
        username: "",
    });


    const [loading, setLoading] = React.useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await ValidationSchema.validate(formData, {abortEarly: false});
            setErrors({});
            setLoading(true);

            // Send data to server
            await axios.post("api/users/signup", formData);

            // Clear form
            setFormData({
                username: "",
                password: "",
                email: "",
            });

            alert("Signup successful");
        } catch (validationErrors:any) {
            console.log("signup failed line 34 under signup/page", validationErrors.message);
            toast.error(validationErrors.message);
            /*const newErrors = {};
            if (error.length > 0) {
                validationErrors.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
            }
            setErrors(newErrors);*/
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>{loading? "Processing" : "Signup"}</h1>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            className="p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-gray-600 text-black"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p>{errors.username}</p>}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            className="p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-gray-600 text-black"
                            type="text"
                            name="email"
                            value={formData.email}  
                            onChange={handleChange}
                        />
                        {errors.email && <p>{errors.email}</p>} 
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            className="p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:border-gray-600 text-black"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <button type="submit">Signup</button>
                </form>
            </div>
        </>
    );
};
export default Form;