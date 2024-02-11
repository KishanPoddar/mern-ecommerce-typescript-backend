import { Router } from "express";
import {
    deleteUser,
    getAllUsers,
    getUser,
    newUser,
} from "../controllers/user.controller.js";
import { isAdmin } from "../middlewares/auth.js";

const app = Router();

//route - /api/v1/user/new
app.post("/new", newUser);

//route - /api/v1/user/all
app.get("/all", isAdmin, getAllUsers);

//route - /api/v1/user/:id
app.route("/:id").get(getUser).delete(isAdmin, deleteUser);

export default app;
