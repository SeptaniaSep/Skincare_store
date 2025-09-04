import { FaTrash } from "react-icons/fa";
import EditProductButton from "./button_edit";
import { deleteProduct } from "../../api/product";


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

const handleDelete = async (id: number) => {
  if (!confirm("Yakin ingin menghapus produk ini?")) return;

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token tidak ditemukan");

    await deleteProduct(id, token);

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
              <EditProductButton
                product={product}
                onUpdated={() => onDelete()}
              />
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
