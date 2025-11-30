import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  ShoppingCart,
  CreditCard,
  Bell,
  History,
} from "lucide-react";

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const [activeTab, setActiveTab] = useState<
    "profile" | "orders" | "wishlist" | "settings"
  >("profile");

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const stats = [
    {
      label: "Đơn hàng",
      value: user?.totalOrders || 0,
      icon: Package,
      color: "blue",
    },
    {
      label: "Giỏ hàng",
      value: getCartCount(),
      icon: ShoppingCart,
      color: "green",
    },
    {
      label: "Số dư",
      value: `${(user?.balance || 0).toLocaleString("vi-VN")}đ`,
      icon: CreditCard,
      color: "purple",
    },
    {
      label: "Tổng chi tiêu",
      value: `${(user?.totalSpent || 0).toLocaleString("vi-VN")}đ`,
      icon: History,
      color: "orange",
    },
  ];

  const menuItems = [
    { id: "profile", label: "Thông tin cá nhân", icon: User },
    { id: "orders", label: "Đơn hàng của tôi", icon: Package },
    { id: "wishlist", label: "Yêu thích", icon: Heart },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user?.fullName || user?.username}
                </h1>
                <p className="text-gray-500">{user?.email}</p>
                <div className="mt-2 flex items-center space-x-2">
                  {user?.role === "admin" && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      Admin
                    </span>
                  )}
                  {user?.role === "vip" && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      VIP
                    </span>
                  )}
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {user?.status === "active" ? "Hoạt động" : user?.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/notifications"
                className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors relative"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={20} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: "from-blue-500 to-blue-600",
              green: "from-green-500 to-green-600",
              purple: "from-purple-500 to-purple-600",
              orange: "from-orange-500 to-orange-600",
            };

            return (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${
                      colorClasses[stat.color as keyof typeof colorClasses]
                    } rounded-lg flex items-center justify-center`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-4">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as typeof activeTab)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                          : "text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-8">
              {activeTab === "profile" && <ProfileTab user={user} />}
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

// Profile Tab
const ProfileTab: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên đăng nhập
          </label>
          <input
            type="text"
            value={user?.username || ""}
            disabled
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Họ và tên
          </label>
          <input
            type="text"
            value={user?.fullName || ""}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            value={user?.phone || ""}
            placeholder="Chưa cập nhật"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
        Cập nhật thông tin
      </button>
    </div>
  );
};

// Orders Tab
const OrdersTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Đơn hàng của tôi</h2>
      <div className="text-center py-12">
        <Package size={64} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
        <Link
          to="/products"
          className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Mua sắm ngay
        </Link>
      </div>
    </div>
  );
};

// Wishlist Tab
const WishlistTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Danh sách yêu thích</h2>
      <div className="text-center py-12">
        <Heart size={64} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">Chưa có sản phẩm yêu thích</p>
      </div>
    </div>
  );
};

// Settings Tab
const SettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Cài đặt tài khoản</h2>
      <div className="space-y-4">
        <div className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Đổi mật khẩu
          </h3>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Mật khẩu hiện tại"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold">
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
