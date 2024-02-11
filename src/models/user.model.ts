import { Schema, model } from "mongoose";
import validator from "validator";

interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: "admin" | "user";
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    //Virtual Attribute
    age: number;
}

const userSchema = new Schema(
    {
        _id: {
            type: String,
            required: [true, "Please enter ID"],
        },
        name: {
            type: String,
            required: [true, "Please enter your name"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: [true, "Email already exists"],
            validate: validator.default.isEmail,
        },
        photo: {
            type: String,
            required: [true, "Please add photo"],
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            required: [true, "Please enter your gender"],
        },
        dob: {
            type: Date,
            required: [true, "Please enter Date of Birth"],
        },
    },
    { timestamps: true }
);

userSchema.virtual("age").get(function () {
    const today = new Date();
    const dob: Date = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
        age--;
    }
    return age;
});

export const User = model<IUser>("User", userSchema);
