import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { createProduct, deleteProduct, getProducts, patchProduct } from "../controllers/product";

const productRoutes = Router();

productRoutes.post("/create", authenticate, createProduct);
productRoutes.get("/get", authenticate, getProducts);
// productRoutes.put("/put/:id", authenticate, updateProduct);
productRoutes.patch("/patch/:id", authenticate, patchProduct);
productRoutes.delete("/delete/:id", authenticate, deleteProduct);


export default productRoutes;
