import express from "express";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import cors from "cors";


const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // asal frontend (Vite)
  credentials: true, // kalau mau kirim cookie/token
}));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
