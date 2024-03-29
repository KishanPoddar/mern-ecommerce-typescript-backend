import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const isAdmin = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(
            new ErrorHandler("Please login to access this resource", 401)
        );

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User does not exist", 401));

    if (user.role !== "admin")
        return next(new ErrorHandler("You are not allowed to access this resource", 403));

    next();
});
