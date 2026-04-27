import React, { useEffect, useMemo, useState } from "react";
import { DollarSign, ShoppingBag, Users, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { adminService, type AdminOrderSummary } from "../../services/adminService";
import type { Product } from "../../services/productService";
import type { User as UserType } from "../../services/authService";

const formatVnd = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrderSummary[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersData, productsData, usersData] = await Promise.all([
          adminService.getOrders(),
          adminService.getProducts(),
          adminService.getUsers(),
        ]);
        setOrders(ordersData);
        setProducts(productsData);
        setUsers(usersData);
      } catch (err) {
        console.error("Failed to load admin dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    void loadData();
  }, []);

  const stats = useMemo(() => {
    const revenue = orders.filter((order) => order.paymentStatus === "paid").reduce((sum, order) => sum + order.finalAmount, 0);
    return [
      { label: "Tổng doanh thu", value: formatVnd(revenue), icon: DollarSign },
      { label: "Đơn hàng", value: String(orders.length), icon: ShoppingBag },
      { label: "Người dùng", value: String(users.length), icon: Users },
      { label: "Sản phẩm", value: String(products.length), icon: Package },
    ];
  }, [orders, products, users]);

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard quản trị</h1>
        <p className="text-gray-500 mt-1">Số liệu tổng hợp từ API thật của hệ thống.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4"><Icon size={22} /></div>
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Đơn hàng gần đây</h2>
        </div>
        <div className="divide-y">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="font-bold text-gray-900">{order.orderNumber}</div>
                <div className="text-sm text-gray-500">{order.customerName} · {order.customerEmail}</div>
              </div>
              <div className="font-semibold text-orange-600">{formatVnd(order.finalAmount)}</div>
              <div className="flex items-center gap-2">
                {order.status === "completed" && <CheckCircle size={18} className="text-green-600" />}
                {order.status === "pending" && <Clock size={18} className="text-yellow-600" />}
                {order.status === "cancelled" && <XCircle size={18} className="text-red-600" />}
                <span className="text-sm font-medium text-gray-600">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
