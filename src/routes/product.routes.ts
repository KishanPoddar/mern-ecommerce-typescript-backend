import { Router } from "express";
import { isAdmin } from "../middlewares/auth.js";
import {
    deleteProduct,
    getAdminProducts,
    getAllCategories,
    getFilterProducts,
    getLatestProducts,
    getSingleProduct,
    newProduct,
    updateProduct,
} from "../controllers/product.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const app = Router();

//To create new product - /api/v1/product/new
app.post("/new", isAdmin, singleUpload, newProduct);

//Search Product - /api/v1/product/latest
app.get("/all", getFilterProducts);

//Get 5 latest products - /api/v1/product/latest
app.get("/latest", getLatestProducts);

//Get all the categories - /api/v1/product/categories
app.get("/categories", getAllCategories);

//Get all admin products - /api/v1/product/admin/products
app.get("/admin-products", isAdmin, getAdminProducts);

//Get, Update, Delete Product  - /api/v1/product/:id
app.route("/:id")
    .get(getSingleProduct)
    .put(isAdmin, singleUpload, updateProduct)
    .delete(isAdmin, deleteProduct);

export default app;
