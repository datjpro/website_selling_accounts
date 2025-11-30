import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  TrendingUp,
} from "lucide-react";

const AdminOrders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const orders = [
    {
      id: "#ORD-001234",
      customer: {
        name: "Nguyễn Văn A",
        email: "nguyenvana@gmail.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      },
      product: "Liên Quân Mobile - VIP 15",
      amount: "2,500,000đ",
      status: "completed",
      paymentMethod: "MoMo",
      date: "01/12/2024 14:30",
    },
    {
      id: "#ORD-001233",
      customer: {
        name: "Trần Thị B",
        email: "tranthib@gmail.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      },
      product: "Free Fire - Căn cước + Full đồ",
      amount: "1,800,000đ",
      status: "pending",
      paymentMethod: "ZaloPay",
      date: "01/12/2024 14:15",
    },
    {
      id: "#ORD-001232",
      customer: {
        name: "Lê Văn C",
        email: "levanc@gmail.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      },
      product: "PUBG Mobile - Conqueror",
      amount: "3,200,000đ",
      status: "processing",
      paymentMethod: "Thẻ ATM",
      date: "01/12/2024 13:45",
    },
    {
      id: "#ORD-001231",
      customer: {
        name: "Phạm Thị D",
        email: "phamthid@gmail.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
      },
      product: "Liên Minh: Tốc Chiến - Kim Cương",
      amount: "2,100,000đ",
      status: "cancelled",
      paymentMethod: "MoMo",
      date: "01/12/2024 12:20",
    },
    {
      id: "#ORD-001230",
      customer: {
        name: "Hoàng Văn E",
        email: "hoangvane@gmail.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
      },
      product: "Valorant - Immortal Rank",
      amount: "4,500,000đ",
      status: "completed",
      paymentMethod: "Thẻ Visa",
      date: "01/12/2024 11:10",
    },
    {
      id: "#ORD-001229",
      customer: {
        name: "Đinh Thị F",
        email: "dinhthif@gmail.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
      },
      product: "Liên Quân Mobile - VIP 10",
      amount: "1,500,000đ",
      status: "pending",
      paymentMethod: "ZaloPay",
      date: "01/12/2024 10:35",
    },
  ];

  const statusOptions = [
    { value: "all", label: "Tất cả trạng thái" },
    { value: "completed", label: "Hoàn thành" },
    { value: "processing", label: "Đang xử lý" },
    { value: "pending", label: "Chờ xử lý" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: {
        label: "Hoàn thành",
        class: "bg-green-100 text-green-700",
        icon: CheckCircle,
      },
      pending: {
        label: "Chờ xử lý",
        class: "bg-yellow-100 text-yellow-700",
        icon: Clock,
      },
      processing: {
        label: "Đang xử lý",
        class: "bg-blue-100 text-blue-700",
        icon: TrendingUp,
      },
      cancelled: {
        label: "Đã hủy",
        class: "bg-red-100 text-red-700",
        icon: XCircle,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
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

  // Statistics
  const stats = [
    {
      label: "Tổng đơn hàng",
      value: "1,234",
      icon: Package,
      color: "blue",
    },
    {
      label: "Hoàn thành",
      value: "892",
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Đang xử lý",
      value: "256",
      icon: TrendingUp,
      color: "yellow",
    },
    {
      label: "Đã hủy",
      value: "86",
      icon: XCircle,
      color: "red",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
        <p className="text-gray-500 mt-1">Theo dõi và xử lý tất cả đơn hàng</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "from-blue-500 to-blue-600",
            green: "from-green-500 to-green-600",
            yellow: "from-yellow-500 to-orange-600",
            red: "from-red-500 to-red-600",
          };

          return (
            <div
              key={stat.label}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
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
                placeholder="Tìm mã đơn, tên khách hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filter by Status */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
            <Download size={20} />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Mã đơn
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Thanh toán
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày đặt
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-blue-600">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={order.customer.avatar}
                        alt={order.customer.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {order.customer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {order.product}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {order.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{order.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Hiển thị <span className="font-semibold">1-6</span> trong{" "}
            <span className="font-semibold">6</span> đơn hàng
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

export default AdminOrders;
