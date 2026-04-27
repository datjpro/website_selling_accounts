import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Save, X, Search } from "lucide-react";
import { adminService, type AdminPromotionPayload } from "../../services/adminService";
import type { Promotion } from "../../services/promotionService";

const emptyForm: AdminPromotionPayload = {
  code: "",
  title: "",
  description: "",
  discountType: "percentage",
  discountValue: 0,
  minOrderAmount: 0,
  maxDiscountAmount: null,
  usageLimit: null,
  usagePerUser: 1,
  isActive: true,
  badge: "",
  startDate: "",
  endDate: "",
};

const AdminPromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<AdminPromotionPayload>(emptyForm);

  const loadPromotions = async () => {
    setLoading(true);
    try {
      setPromotions(await adminService.getPromotions());
    } catch (error) {
      console.error("Failed to load promotions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPromotions();
  }, []);

  const resetEditor = () => {
    setEditingPromotion(null);
    setIsAdding(false);
    setFormData(emptyForm);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editingPromotion) {
        const updatedList = await adminService.updatePromotion(editingPromotion.id, formData);
        setPromotions(updatedList);
      } else {
        const createdList = await adminService.createPromotion(formData);
        setPromotions(createdList);
      }
      resetEditor();
    } catch {
      alert("Không thể lưu khuyến mãi.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa khuyến mãi này?")) return;
    try {
      await adminService.deletePromotion(id);
      setPromotions((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Không thể xóa khuyến mãi.");
    }
  };

  const filteredPromotions = promotions.filter((item) =>
    item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý khuyến mãi</h1>
          <p className="text-gray-500 mt-1">Quản lý mã giảm giá và chiến dịch khuyến mãi.</p>
        </div>
        <button onClick={() => { setIsAdding(true); setEditingPromotion(null); setFormData(emptyForm); }} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
          <Plus size={20} /> Thêm khuyến mãi
        </button>
      </div>

      {(isAdding || editingPromotion) && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{editingPromotion ? "Chỉnh sửa khuyến mãi" : "Thêm khuyến mãi mới"}</h2>
            <button onClick={resetEditor}><X size={24} className="text-gray-400" /></button>
          </div>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium mb-1">Mã</label><input required value={formData.code} onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Tiêu đề</label><input required value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Loại giảm giá</label><select value={formData.discountType} onChange={(e) => setFormData((prev) => ({ ...prev, discountType: e.target.value as AdminPromotionPayload["discountType"] }))} className="w-full px-4 py-2 border rounded-lg"><option value="percentage">percentage</option><option value="fixed">fixed</option><option value="gift">gift</option></select></div>
            <div><label className="block text-sm font-medium mb-1">Giá trị giảm</label><input required type="number" value={formData.discountValue} onChange={(e) => setFormData((prev) => ({ ...prev, discountValue: Number(e.target.value) }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Đơn tối thiểu</label><input type="number" value={formData.minOrderAmount || 0} onChange={(e) => setFormData((prev) => ({ ...prev, minOrderAmount: Number(e.target.value) }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Giới hạn sử dụng</label><input type="number" value={formData.usageLimit || 0} onChange={(e) => setFormData((prev) => ({ ...prev, usageLimit: Number(e.target.value) || null }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Badge</label><input value={formData.badge} onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Số lần/user</label><input type="number" value={formData.usagePerUser || 1} onChange={(e) => setFormData((prev) => ({ ...prev, usagePerUser: Number(e.target.value) }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Mô tả</label><textarea value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} className="w-full px-4 py-2 border rounded-lg h-28" /></div>
            <div><label className="block text-sm font-medium mb-1">Bắt đầu</label><input type="datetime-local" value={formData.startDate || ""} onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium mb-1">Kết thúc</label><input type="datetime-local" value={formData.endDate || ""} onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" /></div>
            <div className="md:col-span-2"><label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(formData.isActive)} onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))} /> Kích hoạt khuyến mãi</label></div>
            <div className="md:col-span-2 flex justify-end gap-3"><button type="button" onClick={resetEditor} className="px-6 py-2 border rounded-lg">Hủy</button><button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"><Save size={18} /> Lưu khuyến mãi</button></div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm khuyến mãi..." className="w-full pl-10 pr-4 py-2 border rounded-lg" /></div></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b"><tr><th className="px-6 py-4 text-sm font-semibold">Mã / Tiêu đề</th><th className="px-6 py-4 text-sm font-semibold">Giảm giá</th><th className="px-6 py-4 text-sm font-semibold">Sử dụng</th><th className="px-6 py-4 text-sm font-semibold">Trạng thái</th><th className="px-6 py-4 text-sm font-semibold">Thao tác</th></tr></thead>
            <tbody className="divide-y">
              {filteredPromotions.map((promotion) => (
                <tr key={promotion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><div className="font-bold text-gray-900">{promotion.code}</div><div className="text-xs text-gray-500">{promotion.title}</div></td>
                  <td className="px-6 py-4 text-sm">{promotion.discountType === "percentage" ? `${promotion.discountValue}%` : promotion.discountValue.toLocaleString("vi-VN")}</td>
                  <td className="px-6 py-4 text-sm">{promotion.usageCount} / {promotion.usageLimit ?? "∞"}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${promotion.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>{promotion.isActive ? "Đang chạy" : "Tạm dừng"}</span></td>
                  <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => { setEditingPromotion(promotion); setIsAdding(false); setFormData({ code: promotion.code, title: promotion.title, description: promotion.description || "", discountType: promotion.discountType, discountValue: promotion.discountValue, minOrderAmount: promotion.minOrderAmount, maxDiscountAmount: promotion.maxDiscountAmount || null, usageLimit: promotion.usageLimit || null, usagePerUser: promotion.usagePerUser, isActive: promotion.isActive, badge: promotion.badge || "", startDate: promotion.startDate ? promotion.startDate.slice(0, 16) : "", endDate: promotion.endDate ? promotion.endDate.slice(0, 16) : "" }); }} className="p-2 text-green-600 hover:bg-green-50 rounded"><Edit size={18} /></button><button onClick={() => void handleDelete(promotion.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPromotions;
