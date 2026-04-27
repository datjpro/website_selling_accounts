import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash2, Eye, Save, X } from "lucide-react";
import { adminService, type AdminProductPayload } from "../../services/adminService";
import type { Product, Category } from "../../services/productService";

const formatVnd = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const emptyForm: AdminProductPayload = {
  title: "",
  name: "",
  slug: "",
  gameTitle: "",
  description: "",
  price: 0,
  stockQuantity: 1,
  status: "active",
};

const AdminProducts: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<AdminProductPayload>(emptyForm);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        adminService.getProducts(),
        adminService.getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to load admin products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const resetEditor = () => {
    setIsAdding(false);
    setEditingProduct(null);
    setFormData(emptyForm);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      return;
    }

    try {
      await adminService.deleteProduct(id);
      setProducts((previousProducts) => previousProducts.filter((product) => product.id !== id));
    } catch {
      alert("Không thể xóa sản phẩm.");
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (editingProduct) {
        const updatedProduct = await adminService.updateProduct(editingProduct.id, formData);
        setProducts((previousProducts) =>
          previousProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
      } else {
        const createdProduct = await adminService.createProduct(formData);
        setProducts((previousProducts) => [createdProduct, ...previousProducts]);
      }

      resetEditor();
    } catch {
      alert("Không thể lưu sản phẩm. Vui lòng kiểm tra dữ liệu và thử lại.");
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAdding(false);
    setFormData({
      categoryId: product.categoryId,
      title: product.name,
      name: product.name,
      slug: product.slug,
      gameTitle: product.gameTitle,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      stockQuantity: product.stockQuantity,
      status: product.status,
      isFeatured: product.isFeatured,
      isHot: product.isHot,
    });
  };

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.gameTitle.toLowerCase().includes(query) ||
      product.slug.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="text-gray-500 mt-1">Tổng cộng {products.length} sản phẩm thực tế từ hệ thống.</p>
        </div>
        <button
          onClick={() => {
            setIsAdding(true);
            setEditingProduct(null);
            setFormData(emptyForm);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
        >
          <Plus size={20} /> Thêm sản phẩm mới
        </button>
      </div>

      {(isAdding || editingProduct) && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h2>
            <button onClick={resetEditor}>
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(event) =>
                  setFormData((previousFormData) => ({
                    ...previousFormData,
                    name: event.target.value,
                    title: event.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                required
                type="text"
                value={formData.slug}
                onChange={(event) =>
                  setFormData((previousFormData) => ({
                    ...previousFormData,
                    slug: event.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tên game</label>
              <input
                required
                type="text"
                value={formData.gameTitle}
                onChange={(event) =>
                  setFormData((previousFormData) => ({
                    ...previousFormData,
                    gameTitle: event.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Danh mục</label>
              <select
                value={formData.categoryId || ""}
                onChange={(event) =>
                  setFormData((previousFormData) => ({
                    ...previousFormData,
                    categoryId: event.target.value ? Number(event.target.value) : null,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Giá bán</label>
              <input
                required
                type="number"
                value={formData.price}
                onChange={(event) =>
                  setFormData((previousFormData) => ({
                    ...previousFormData,
                    price: Number(event.target.value),
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Số lượng</label>
              <input
                required
                type="number"
                value={formData.stockQuantity}
                onChange={(event) =>
                  setFormData((previousFormData) => ({
                    ...previousFormData,
                    stockQuantity: Number(event.target.value),
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Trạng thái</label>
              <select
                value={formData.status}
                onChange={(event) =>
                  setFormData((previousFormData) => ({
                    ...previousFormData,
                    status: event.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="active">active</option>
                <option value="sold">sold</option>
                <option value="out_of_stock">out_of_stock</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Mô tả</label>
              <textarea
                required
                value={formData.description}
                onChange={(event) =>
                  setFormData((previousFormData) => ({
                    ...previousFormData,
                    description: event.target.value,
                  }))
                }
                className="w-full px-4 py-2 border rounded-lg h-32"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isFeatured)}
                  onChange={(event) =>
                    setFormData((previousFormData) => ({
                      ...previousFormData,
                      isFeatured: event.target.checked,
                    }))
                  }
                />
                Nổi bật
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isHot)}
                  onChange={(event) =>
                    setFormData((previousFormData) => ({
                      ...previousFormData,
                      isHot: event.target.checked,
                    }))
                  }
                />
                Hot
              </label>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3">
              <button type="button" onClick={resetEditor} className="px-6 py-2 border rounded-lg">
                Hủy
              </button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                <Save size={18} /> Lưu sản phẩm
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm tên sản phẩm, game hoặc slug..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Sản phẩm</th>
                <th className="px-6 py-4 text-sm font-semibold">Game</th>
                <th className="px-6 py-4 text-sm font-semibold">Giá</th>
                <th className="px-6 py-4 text-sm font-semibold">Kho / Đã bán</th>
                <th className="px-6 py-4 text-sm font-semibold">Trạng thái</th>
                <th className="px-6 py-4 text-sm font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.gameTitle}</td>
                  <td className="px-6 py-4 font-bold text-orange-600">{formatVnd(product.price)}</td>
                  <td className="px-6 py-4 text-sm">
                    {product.stockQuantity} / {product.soldCount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/product/${product.id}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => startEdit(product)} className="p-2 text-green-600 hover:bg-green-50 rounded">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => void handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
