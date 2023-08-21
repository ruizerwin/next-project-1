import { connect } from "@/dbConfig/dbConfig";
import User from "@/modules/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

/*export default async function POST(request: NextRequest) {
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
}*/


export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { username, email, password } = req.body;

            const newData = new User({
                username,
                email,
                password,
            });

            await newData.save();
            res.status(200).json({ message: "Data saved successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error saving data" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}