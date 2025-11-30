import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Shield,
  Crown,
  User,
} from "lucide-react";

const AdminUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0912345678",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      role: "user",
      status: "active",
      orders: 12,
      spent: "15,800,000đ",
      joinDate: "15/10/2024",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@gmail.com",
      phone: "0923456789",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      role: "vip",
      status: "active",
      orders: 45,
      spent: "89,500,000đ",
      joinDate: "03/09/2024",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@gmail.com",
      phone: "0934567890",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      role: "admin",
      status: "active",
      orders: 0,
      spent: "0đ",
      joinDate: "01/08/2024",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@gmail.com",
      phone: "0945678901",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
      role: "user",
      status: "banned",
      orders: 3,
      spent: "2,100,000đ",
      joinDate: "20/11/2024",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@gmail.com",
      phone: "0956789012",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
      role: "vip",
      status: "active",
      orders: 28,
      spent: "56,200,000đ",
      joinDate: "12/07/2024",
    },
  ];

  const roleOptions = [
    { value: "all", label: "Tất cả vai trò" },
    { value: "admin", label: "Admin" },
    { value: "vip", label: "VIP" },
    { value: "user", label: "User" },
  ];

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: {
        label: "Admin",
        class: "bg-purple-100 text-purple-700",
        icon: Shield,
      },
      vip: {
        label: "VIP",
        class: "bg-yellow-100 text-yellow-700",
        icon: Crown,
      },
      user: {
        label: "User",
        class: "bg-blue-100 text-blue-700",
        icon: User,
      },
    };

    const config = roleConfig[role as keyof typeof roleConfig];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.class}`}
      >
        <Icon size={14} className="mr-1" />
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle size={14} className="mr-1" />
          Hoạt động
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        <Ban size={14} className="mr-1" />
        Bị khóa
      </span>
    );
  };

  // Statistics
  const stats = [
    { label: "Tổng người dùng", value: "8,549", color: "blue" },
    { label: "VIP Members", value: "234", color: "yellow" },
    { label: "Hoạt động", value: "8,125", color: "green" },
    { label: "Bị khóa", value: "424", color: "red" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
        <p className="text-gray-500 mt-1">
          Quản lý tất cả tài khoản người dùng
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const colorClasses = {
            blue: "from-blue-500 to-blue-600",
            yellow: "from-yellow-500 to-orange-600",
            green: "from-green-500 to-green-600",
            red: "from-red-500 to-red-600",
          };

          return (
            <div
              key={stat.label}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {stat.value}
              </p>
              <div
                className={`mt-2 h-2 bg-gradient-to-r ${
                  colorClasses[stat.color as keyof typeof colorClasses]
                } rounded-full`}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Filters & Search */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Tìm tên, email, số điện thoại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filter by Role */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tổng chi tiêu
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày tham gia
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">ID: #{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {user.orders}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {user.spent}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {user.joinDate}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button
                        className={`p-2 rounded-lg transition-colors ${
                          user.status === "active"
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                      >
                        <Ban size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Hiển thị <span className="font-semibold">1-5</span> trong{" "}
            <span className="font-semibold">5</span> người dùng
          </p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Trước
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
