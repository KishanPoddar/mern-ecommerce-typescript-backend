import { Router } from "express";
import {
    allOrders,
    deleteOrder,
    getSingleOrder,
    myOrders,
    newOrder,
    processOrder,
} from "../controllers/order.controller.js";
import { isAdmin } from "../middlewares/auth.js";

const app = Router();

//route - /api/v1/order/new
app.post("/new", newOrder);

//route - /api/v1/order/my
app.get("/my", myOrders);

//route - /api/v1/order/all
app.get("/all", isAdmin, allOrders);

//route - /api/v1/order/:id
app.route("/:id")
    .get(getSingleOrder)
    .put(isAdmin, processOrder)
    .delete(isAdmin, deleteOrder);

export default app;
