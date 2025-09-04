import { useState } from "react";
import { createProduct } from "../../api/product";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void; 
};

export default function CreateProductModal({ isOpen, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(""); 
  const [stock, setStock] = useState<number | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !price || stock === "") return;

  try {
    const token = localStorage.getItem("token"); 
    if (!token) throw new Error("Token tidak ditemukan");

    await createProduct({ name, price, stock: Number(stock) }, token);
    onCreate(); 
    setName("");
    setPrice("");
    setStock("");
    onClose();
  } catch (error) {
    console.error("Gagal create product:", error);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-200 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 font-bold text-xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Create Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-900 rounded-lg focus:outline-none focus:ring focus:ring-slate-800"
          />
          <input
            type="text" 
            placeholder="Rp"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-3 py-2 border border-slate-900 rounded-lg focus:outline-none focus:ring focus:ring-slate-800"
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
            required
            className="w-full px-3 py-2 border border-slate-900 rounded-lg focus:outline-none focus:ring focus:ring-slate-800"
          />
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-950 transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
