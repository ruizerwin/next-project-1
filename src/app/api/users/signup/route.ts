import { connectToMongoDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { IUser } from "@/types/index";



const handler = async (req: NextRequest, res: NextResponse) => {
    connectToMongoDB().catch(err => res.json(err))

    if(req.method === "POST") {
        if(!req.body) {
            return res.status(400).json({ error: "No data provided" });
        }

        const { username, email, password } = req.body;

        //check if user already exists
        const userExist = await User.findOne({ email });
        if(userExist) {
            return res.status(409).json({ error: "User already exists" });

        } else {
            if(password.length < 6) {
                return res.status(409).json({ error: "Password must be at least 6 characters long" });
            } else {
                //hash password
                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(password, salt);


                User.create({
                    username,
                    email,
                    password: hashedPassword,
                }, (error:unknown, data: IUser) => {
                    if(error && error instanceof mongoose.Error.ValidationError) {
                        //MongoDB will return array of errors
                        for(let field in error.errors) {
                            const msg = error.errors[field].message;
                            return res.status(409).json({ error: msg });
                        }
                    } else {
                        console.log(data);
                    }
                });

                const user = {
                    username: data.username,
                    email: data.email,
                    _id: data._id,
                }
                
                return res.status(201).json({
                    message: "User created successfully", 
                    success: true, 
                    user
                });
            }
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
export default handler;