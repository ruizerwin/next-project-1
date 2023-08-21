import { data } from "autoprefixer";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: string,
        required: [true, "Please insert Username"],
        unique: true,
    },
    email: {
        type:string,
        reguired: [true, "Please insert Email"],
        unique: true,
    },
    password: {
        type: string,
        required: [true, "Please insert Password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    verifyToken: string,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.Users || mongoose.model("User", userSchema);

export default User;