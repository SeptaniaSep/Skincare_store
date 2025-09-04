import { Request, RequestHandler, Response } from "express";
import prisma from "../prisma/client";
import { AuthRequest } from "../middleware/auth";


//CREATE PRODUCT
export const createProduct = async (req: AuthRequest, res: Response) => {
  const { 
    name, 
    price, 
    stock 
} = req.body;

  if (!req.userId) return res.status(401).json({ message: "User tidak ditemukan" });

  try {
    const product = await prisma.product.create({
      data: 
      { 
        name, price: parseFloat(price), 
        stock: parseInt(stock), 
        userId: req.userId 
    },
    });

    res.status(201).json({ message: "Product berhasil dibuat", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal membuat product" });
  }
};


//GET PRODUCT
export const getProducts = async (req: Request, res: Response ) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      message: "Daftar semua produk",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data produk" });
  }
};

// DELETE product by ID
export const deleteProduct: RequestHandler = async (req: Request, res: Response ) => {
  const { id } = req.params;

  try {

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      res.status(404).json({ message: "Produk tidak ditemukan" });
      return 
    }

 
    await prisma.product.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghapus produk" });
  }
};


// UPDATE product by ID
export const updateProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
  
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      res.status(404).json({ message: "Produk tidak ditemukan" });
      return 
    }

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name ?? product.name,
        price: price ?? product.price,
        stock: stock ?? product.stock,
      },
    });

    res.status(200).json({
      message: "Produk berhasil diperbarui",
      product: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengedit produk" });
  }
};

// PATCH product by ID (update sebagian field)
export const patchProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(price && { price }),
        ...(stock && { stock }),
      },
    });

    res.status(200).json({
      message: "Produk berhasil diperbarui (partial update)",
      product: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengupdate produk" });
  }
};