import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import NodeCache from "node-cache";
import Stripe from "stripe";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
import cors from "cors";

//Importing Routes
import orderRoute from "./routes/order.routes.js";
import paymentRoute from "./routes/payment.routes.js";
import productRoute from "./routes/product.routes.js";
import dashboardRoute from "./routes/stats.routes.js";
import userRoute from "./routes/user.routes.js";

config({ path: "./config.env" });

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_DB_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

connectDB(mongoURI);

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//using route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});
