import React from "react";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      label: "Tổng doanh thu",
      value: "125,500,000đ",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "blue",
    },
    {
      label: "Đơn hàng",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingBag,
      color: "green",
    },
    {
      label: "Người dùng",
      value: "8,549",
      change: "+23.1%",
      trend: "up",
      icon: Users,
      color: "purple",
    },
    {
      label: "Sản phẩm",
      value: "456",
      change: "-2.4%",
      trend: "down",
      icon: Package,
      color: "orange",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-001234",
      customer: "Nguyễn Văn A",
      product: "Liên Quân Mobile - VIP 15",
      amount: "2,500,000đ",
      status: "completed",
      time: "5 phút trước",
    },
    {
      id: "#ORD-001233",
      customer: "Trần Thị B",
      product: "Free Fire - Căn cước + Full đồ",
      amount: "1,800,000đ",
      status: "pending",
      time: "15 phút trước",
    },
    {
      id: "#ORD-001232",
      customer: "Lê Văn C",
      product: "PUBG Mobile - Conqueror",
      amount: "3,200,000đ",
      status: "completed",
      time: "1 giờ trước",
    },
    {
      id: "#ORD-001231",
      customer: "Phạm Thị D",
      product: "Liên Minh: Tốc Chiến - Kim Cương",
      amount: "2,100,000đ",
      status: "cancelled",
      time: "2 giờ trước",
    },
    {
      id: "#ORD-001230",
      customer: "Hoàng Văn E",
      product: "Valorant - Immortal",
      amount: "4,500,000đ",
      status: "processing",
      time: "3 giờ trước",
    },
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Chào mừng trở lại! Đây là tổng quan về cửa hàng của bạn.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${
                    colorClasses[stat.color as keyof typeof colorClasses]
                  } rounded-lg flex items-center justify-center`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm font-semibold ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Đơn hàng gần đây</h2>
          <p className="text-gray-500 text-sm mt-1">
            Theo dõi các đơn hàng mới nhất
          </p>
        </div>
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
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Thời gian
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-blue-600">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {order.customer}
                    </span>
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
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{order.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          <Package size={32} className="mb-3" />
          <h3 className="text-lg font-bold">Thêm sản phẩm mới</h3>
          <p className="text-sm text-blue-100 mt-1">
            Đăng tải sản phẩm mới lên hệ thống
          </p>
        </button>

        <button className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          <Users size={32} className="mb-3" />
          <h3 className="text-lg font-bold">Quản lý người dùng</h3>
          <p className="text-sm text-purple-100 mt-1">
            Xem và quản lý tài khoản người dùng
          </p>
        </button>

        <button className="bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
          <TrendingUp size={32} className="mb-3" />
          <h3 className="text-lg font-bold">Xem báo cáo</h3>
          <p className="text-sm text-green-100 mt-1">
            Thống kê chi tiết doanh thu và bán hàng
          </p>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
