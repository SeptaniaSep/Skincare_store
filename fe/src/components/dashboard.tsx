import { useState, useEffect } from "react";
import { getProducts } from "../api/product";
import CreateProductModal from "../pages/dashboard.tsx/create";
import ProductList from "../pages/dashboard.tsx/list";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await getProducts(token!);
      setProducts(res.data.products);
    } catch (error) {
      console.error("Gagal fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex items-center py-4 px-10 justify-between bg-slate-300">
        <h1 className="text-3xl font-bold">Product</h1>
        <button
          className="rounded-lg py-1 px-6 bg-slate-800 text-white hover:bg-slate-900 transition"
          onClick={() => setIsOpen(true)}
        >
          Create
        </button>

        <CreateProductModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCreate={fetchProducts}
        />
      </div>

      <div>
        <ProductList
          products={products}
          loading={loading}
          onDelete={fetchProducts} 
        />
      </div>
    </div>
  );
}
