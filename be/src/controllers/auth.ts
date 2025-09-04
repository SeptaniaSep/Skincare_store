import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthRequest } from "../middleware/auth";
import { Gender } from "@prisma/client";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;


//REGISTER
export const registerUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, gender } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, 
        gender: gender === "MALE" ? "Male" : "Female", 
      },
    });

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
      },
    });

    next();
  } catch (error: any) {
    console.error(error);


    if (error.code === "P2002") {
      res.status(400).json({ error: "Email sudah digunakan" });
    } else {
      res.status(500).json({ error: "Failed to register user" });
    }
  }
};


//LOGIN
export const loginUsers = async (
  req: Request, 
  res: Response
) => {
  const { email, password } = req.body;

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET tidak ditemukan di .env");
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ message: "Email tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login user" });
  }
};


//GET PROFILE
export const getProfile = async (
  req: AuthRequest, 
  res: Response
) => {

  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User tidak ditemukan" });
      return 
    }

    res.status(200).json({
      message: "Profile berhasil diambil",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil profile" });
  }
};
