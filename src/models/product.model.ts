import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
        },
        photo: {
            type: String,
            required: [true, "Please enter photo"],
        },
        price: {
            type: Number,
            required: [true, "Please enter the price"],
        },
        stock: {
            type: Number,
            required: [true, "Please enter teh stock"],
        },
        category: {
            type: String,
            required: [true, "Please enter the category"],
            trim: true,
        },
    },
    { timestamps: true }
);

export const Product = model("Product", productSchema);
