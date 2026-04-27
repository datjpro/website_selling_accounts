import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Save, X, Search, Upload } from "lucide-react";
import { adminService, type AdminCategoryPayload } from "../../services/adminService";
import { uploadService } from "../../services/uploadService";
import type { Category } from "../../services/productService";

const emptyForm: AdminCategoryPayload = {
  name: "",
  slug: "",
  description: "",
  imageUrl: "",
  iconUrl: "",
  isActive: true,
};


const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<AdminCategoryPayload>(emptyForm);

  const loadCategories = async () => {
    setLoading(true);
    try {
      setCategories(await adminService.getCategories());
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCategories();
  }, []);

  const resetEditor = () => {
    setEditingCategory(null);
    setIsAdding(false);
    setFormData(emptyForm);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: "imageUrl" | "iconUrl"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedImageUrl = await uploadService.uploadImage(file);
      setFormData((prev) => ({ ...prev, [field]: uploadedImageUrl }));
    } catch {
      alert("Không thể đọc file ảnh đã chọn.");
    }
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editingCategory) {
        const updated = await adminService.updateCategory(editingCategory.id, formData);
        setCategories((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      } else {
        const created = await adminService.createCategory(formData);
        setCategories((prev) => [created, ...prev]);
      }
      resetEditor();
    } catch {
      alert("Không thể lưu danh mục.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;
    try {
      await adminService.deleteCategory(id);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Không thể xóa danh mục.");
    }
  };

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
          <p className="text-gray-500 mt-1">Thêm, sửa và xóa các category game trong hệ thống.</p>
        </div>
        <button onClick={() => { setIsAdding(true); setEditingCategory(null); setFormData(emptyForm); }} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
          <Plus size={20} /> Thêm danh mục
        </button>
      </div>

      {(isAdding || editingCategory) && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</h2>
            <button onClick={resetEditor}><X size={24} className="text-gray-400" /></button>
          </div>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium mb-1">Tên danh mục</label><input required value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Slug</label><input required value={formData.slug} onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Mô tả</label><textarea value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} className="w-full px-4 py-2 border rounded-lg h-28" /></div>

            <div className="space-y-3">
              <label className="block text-sm font-medium">Ảnh danh mục</label>
              {formData.imageUrl ? <img src={formData.imageUrl} alt="Category preview" className="w-full h-40 object-cover rounded-lg border" /> : <div className="w-full h-40 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400">Chưa có ảnh</div>}
              <label className="inline-flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                <Upload size={16} /> Chọn ảnh từ máy
                <input type="file" accept="image/*" className="hidden" onChange={(e) => void handleImageUpload(e, "imageUrl")} />
              </label>
              <input value={formData.imageUrl} onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))} placeholder="Hoặc dán URL ảnh" className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium">Icon danh mục</label>
              {formData.iconUrl ? <img src={formData.iconUrl} alt="Icon preview" className="w-28 h-28 object-cover rounded-lg border" /> : <div className="w-28 h-28 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center px-2">Chưa có icon</div>}
              <label className="inline-flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                <Upload size={16} /> Chọn icon từ máy
                <input type="file" accept="image/*" className="hidden" onChange={(e) => void handleImageUpload(e, "iconUrl")} />
              </label>
              <input value={formData.iconUrl} onChange={(e) => setFormData((prev) => ({ ...prev, iconUrl: e.target.value }))} placeholder="Hoặc dán URL icon" className="w-full px-4 py-2 border rounded-lg" />
            </div>

            <div className="md:col-span-2"><label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(formData.isActive)} onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))} /> Kích hoạt danh mục</label></div>
            <div className="md:col-span-2 flex justify-end gap-3"><button type="button" onClick={resetEditor} className="px-6 py-2 border rounded-lg">Hủy</button><button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"><Save size={18} /> Lưu danh mục</button></div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm danh mục..." className="w-full pl-10 pr-4 py-2 border rounded-lg" /></div></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b"><tr><th className="px-6 py-4 text-sm font-semibold">Tên</th><th className="px-6 py-4 text-sm font-semibold">Slug</th><th className="px-6 py-4 text-sm font-semibold">Trạng thái</th><th className="px-6 py-4 text-sm font-semibold">Thao tác</th></tr></thead>
            <tbody className="divide-y">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><div className="font-bold text-gray-900">{category.name}</div><div className="text-xs text-gray-500">{category.description || "Không có mô tả"}</div></td>
                  <td className="px-6 py-4 text-sm">{category.slug}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>{category.isActive ? "Đang dùng" : "Ẩn"}</span></td>
                  <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => { setEditingCategory(category); setIsAdding(false); setFormData({ name: category.name, slug: category.slug, description: category.description || "", imageUrl: category.imageUrl || "", iconUrl: category.iconUrl || "", isActive: category.isActive }); }} className="p-2 text-green-600 hover:bg-green-50 rounded"><Edit size={18} /></button><button onClick={() => void handleDelete(category.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;


