import { connect } from "@/dbConfig/dbConfig";
import User from "@/modules/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();

        const { username, email, password } = requestBody;

        console.log(requestBody);

        //  Check if user exist
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exist" },
                { status: 400 }
            );
        }


        //  Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        //  Create User
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User Created",
            success: true,
            savedUser
        });

    } catch (error:any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            { status: 500 }
        );
    }
}
