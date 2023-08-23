import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        minLength: [4, "Username must be at least 4 characters long"],
        maxLength: [30, "Username must not be more than 30 characters long"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        select: false,
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = models.User || model("User", UserSchema);

//const User = mongoose.model("user", userSchema);

export default User;