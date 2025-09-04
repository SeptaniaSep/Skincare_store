import { useState } from "react";
import { patchProduct } from "../../api/product";
import { BiEdit } from "react-icons/bi";

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

export default function EditProductButton({ product, onUpdated }: Props) {
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

      const payload = {
        name: formData.name,
        price: formData.price.toString(), 
        stock: formData.stock,
      };
      const response = await patchProduct(product.id, payload, token);
      onUpdated(response.data.product); 
      setIsOpen(false);
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
      <BiEdit size={20} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0  bg-black/50  bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-slate-200 p-6 rounded shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Edit Produk</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label>Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label>Harga</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-2 py-1"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-slate-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-950"
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
}
