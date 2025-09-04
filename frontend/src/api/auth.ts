import { apiAuth } from "./api";


// Register
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  gender: string;
}) => {
  return await apiAuth.post("/register", data);
};

// Login
export const loginUser = async (data: { email: string; password: string }) => {
  return await apiAuth.post("/login", data);
};

// Profile
export const getProfile = async (token: string) => {
  return await apiAuth.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
