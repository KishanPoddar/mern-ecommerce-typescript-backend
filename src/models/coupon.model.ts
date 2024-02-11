import { model, Schema } from "mongoose";

const couponSchema = new Schema({
    code: {
        type: String,
        required: [true, "Please enter the Coupon Code"],
        unique: true,
    },
    amount: {
        type: Number,
        require: [true, "Please enter the discount amount"],
    },
});

export const Coupon = model("Coupon", couponSchema);
