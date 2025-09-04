import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { patchProduct } from "../../api/product";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

type Props = {
  product: Product;
  onUpdated: (updated: Product) => void;
};

export const EditProductButton = ({ product, onUpdated }: Props) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const data = await patchProduct(product.id, formData, token);
      onUpdated(data.product); // update state parent
      setIsOpen(false); // tutup modal
    } catch (err) {
      console.error(err);
      alert("Gagal update produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="text-blue-600 hover:text-blue-800"
        onClick={() => setIsOpen(true)}
      >
        <FaEdit />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Produk</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block mb-1">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Harga</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
