import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteProduct } from "../../api/product";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

type Props = {
  products: Product[];
  loading: boolean;
  onDelete: () => void;
};

export default function ProductList({ products, loading, onDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (id: number) => {
    console.log("Klik delete id:", id);
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      if (!token) throw new Error("Token tidak ditemukan");

      await deleteProduct(id, token);
      console.log("Hapus sukses");
      onDelete();
    } catch (error) {
      console.error("Gagal hapus produk:", error);
    }
  };

  if (loading) return <p className="px-10 py-6">Loading...</p>;

  return (
    <div className="px-10 py-6">
      <div className="grid grid-cols-4 font-semibold text-gray-600 px-4 mb-2">
        <span>Nama Product</span>
        <span>Harga</span>
        <span>Stok</span>
        <span>Aksi</span>
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-4 items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <span className="font-medium ml-4">{product.name}</span>
            <span>Rp {Number(product.price).toLocaleString()}</span>
            <span>{product.stock}</span>
            <div className="flex gap-4">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setIsOpen(true)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDelete(product.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
