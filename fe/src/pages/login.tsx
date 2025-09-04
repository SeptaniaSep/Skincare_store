import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      const token = res.data.token;
      localStorage.setItem("token", token); // <- simpan token
      navigate("/"); // pindah ke halaman utama
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Login gagal");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900">
      <div className="w-full max-w-md bg-slate-200 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-900 rounded-lg focus:outline-none focus:ring focus:ring-slate-800"
            />
          </div>

          {/* Password */}
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-900 rounded-lg focus:outline-none focus:ring focus:ring-slate-800 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 inset-y-0 flex items-center text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-950 transition"
          >
            Login
          </button>

          {message && (
            <p className="text-center mt-2 text-red-600">{message}</p>
          )}

          <p className="text-sm text-center">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Registrasi
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
