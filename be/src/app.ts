import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
