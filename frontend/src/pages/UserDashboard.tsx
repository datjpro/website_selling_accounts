import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { orderService, type Order } from "../services/orderService";
import { authService } from "../services/authService";
import { uploadService } from "../services/uploadService";
import { Package, Settings, User, LogOut, ShoppingCart, CreditCard, History, Save, KeyRound, Upload } from "lucide-react";

const formatVnd = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);


const UserDashboard: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "wishlist" | "settings">("profile");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const stats = useMemo(
    () => [
      { label: "Đơn hàng", value: user?.totalOrders || 0, icon: Package },
      { label: "Số dư", value: formatVnd(user?.balance || 0), icon: CreditCard },
      { label: "Tổng chi tiêu", value: formatVnd(user?.totalSpent || 0), icon: History },
      { label: "Tài khoản", value: user?.role?.toUpperCase() || "USER", icon: ShoppingCart },
    ],
    [user]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.username} className="w-20 h-20 rounded-full object-cover border-4 border-blue-100" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user?.fullName || user?.username}</h1>
              <p className="text-gray-500">{user?.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{user?.role?.toUpperCase()}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{user?.status === "active" ? "Hoạt động" : user?.status}</span>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><Icon size={22} /></div>
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Thông tin cá nhân", icon: User },
                  { id: "orders", label: "Đơn hàng của tôi", icon: Package },
                  { id: "wishlist", label: "Yêu thích", icon: ShoppingCart },
                  { id: "settings", label: "Cài đặt", icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button key={item.id} onClick={() => setActiveTab(item.id as typeof activeTab)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : "text-gray-700 hover:bg-blue-50"}`}>
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              {activeTab === "profile" && user && <ProfileTab user={user} onSave={updateUser} />}
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "wishlist" && <WishlistTab />}
              {activeTab === "settings" && <SettingsTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab: React.FC<{
  user: NonNullable<ReturnType<typeof useAuth>["user"]>;
  onSave: (data: { fullName?: string; phone?: string; avatarUrl?: string }) => Promise<void>;
}> = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email,
    phone: user.phone || "",
    avatarUrl: user.avatarUrl || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedImageUrl = await uploadService.uploadImage(file);
      setFormData((prev) => ({ ...prev, avatarUrl: uploadedImageUrl }));
      setMessage("Đã tải ảnh lên thành công. Nhấn cập nhật để lưu avatar.");
    } catch {
      setMessage("Không thể đọc file ảnh đã chọn.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await onSave({
        fullName: formData.fullName || undefined,
        phone: formData.phone || undefined,
        avatarUrl: formData.avatarUrl || undefined,
      });
      setMessage("Cập nhật thông tin thành công.");
    } catch {
      setMessage("Không thể cập nhật thông tin.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-100 bg-gray-100 shrink-0">
          {formData.avatarUrl ? (
            <img src={formData.avatarUrl} alt="Avatar preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Chưa có avatar</div>
          )}
        </div>
        <div className="space-y-3">
          <label className="inline-flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
            <Upload size={16} /> Chọn ảnh từ máy
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </label>
          <input type="url" value={formData.avatarUrl} onChange={(e) => setFormData((prev) => ({ ...prev, avatarUrl: e.target.value }))} placeholder="Hoặc dán URL ảnh nếu muốn" className="w-full md:w-[28rem] px-4 py-3 border border-gray-300 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập</label>
          <input type="text" value={user.username} disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
          <input type="text" value={formData.fullName} onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" value={formData.email} disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
          <input type="tel" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
        </div>
      </div>
      {message && <p className="text-sm text-blue-600">{message}</p>}
      <button disabled={saving} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold">
        <Save size={18} /> {saving ? "Đang lưu..." : "Cập nhật thông tin"}
      </button>
    </form>
  );
};

const OrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.getMyOrders();
        setOrders(data);
      } catch {
        setMessage("Không thể tải danh sách đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    void loadOrders();
  }, []);

  if (loading) return <div className="py-12 text-center text-gray-500">Đang tải đơn hàng...</div>;

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h2>
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
          <Link to="/products" className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">Mua sắm ngay</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h2>
      {message && <p className="text-sm text-red-600">{message}</p>}
      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order.id} to={`/user/orders/${order.id}`} className="block border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-bold text-gray-900">{order.orderNumber}</div>
                <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString("vi-VN")}</div>
              </div>
              <div className="text-sm text-gray-600">{order.items.length} sản phẩm</div>
              <div className="font-bold text-orange-600">{formatVnd(order.finalAmount)}</div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{order.status}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{order.paymentStatus}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const WishlistTab: React.FC = () => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-900">Yêu thích</h2>
    <p className="text-gray-600">Phần yêu thích chưa được hỗ trợ endpoint riêng. Tạm thời bạn có thể lưu lại sản phẩm bằng giỏ hàng hoặc quay lại danh mục để xem thêm.</p>
    <Link to="/products" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">Xem sản phẩm</Link>
  </div>
);

const SettingsTab: React.FC = () => {
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    if (!formData.oldPassword || !formData.newPassword) {
      setMessage("Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      setSaving(true);
      await authService.changePassword(formData.oldPassword, formData.newPassword);
      setMessage("Đổi mật khẩu thành công.");
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      setMessage("Không thể đổi mật khẩu.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900">Đổi mật khẩu</h2>
      <div className="grid grid-cols-1 gap-4 max-w-2xl">
        <input type="password" placeholder="Mật khẩu cũ" value={formData.oldPassword} onChange={(e) => setFormData((prev) => ({ ...prev, oldPassword: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
        <input type="password" placeholder="Mật khẩu mới" value={formData.newPassword} onChange={(e) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
        <input type="password" placeholder="Xác nhận mật khẩu mới" value={formData.confirmPassword} onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
      </div>
      {message && <p className="text-sm text-blue-600">{message}</p>}
      <button disabled={saving} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold">
        <KeyRound size={18} /> {saving ? "Đang cập nhật..." : "Đổi mật khẩu"}
      </button>
    </form>
  );
};

export default UserDashboard;


