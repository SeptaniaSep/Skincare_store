import { useEffect, useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { getProfile } from "../api/auth"; 

type UserProfile = {
  id: number;
  name: string;
  email: string;
  gender: string;
  createdAt: string;
};

export default function Sidebar() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login"; 
          return;
        }

        const res = await getProfile(token); 
        setUser(res.data.user);
      } catch (err) {
        console.error("Gagal ambil profile:", err);
        localStorage.removeItem("token");
        window.location.href = "/login"; 
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-900 text-white p-6">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6 mt-8">
        <FaUserCircle className="text-6xl text-gray-300 mb-2" />
        {user ? (
          <>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-l text-gray-400">{user.email}</p>
            <p className="text-l text-gray-400 capitalize">{user.gender}</p>
          </>
        ) : (
          <p className="text-gray-400">Loading...</p>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("token"); 
          window.location.href = "/login"; 
        }}
        className="flex items-center justify-center gap-2 text-white hover:text-slate-700 transition"
      >
        <FaSignOutAlt />
        <span>Keluar</span>
      </button>
    </div>
  );
}
