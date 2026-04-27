import React, { useEffect, useMemo, useState } from "react";
import { Search, CheckCircle, Clock, XCircle, RefreshCcw } from "lucide-react";
import { adminService, type AdminOrderSummary } from "../../services/adminService";

const formatVnd = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    try {
      setOrders(await adminService.getOrders());
    } catch (err) {
      console.error("Failed to load admin orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadOrders(); }, []);

  const filteredOrders = useMemo(() => orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  ), [orders, searchQuery]);

  const updateStatus = async (id: string, status: string, paymentStatus: string) => {
    try {
      const updated = await adminService.updateOrderStatus(id, status, paymentStatus);
      setOrders((prev) => prev.map((order) => order.id === id ? { ...order, status: updated.status, paymentStatus: updated.paymentStatus } : order));
    } catch {
      alert("Không thể cập nhật trạng thái đơn hàng.");
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-gray-500 mt-1">Theo dõi và cập nhật trạng thái đơn hàng thực tế.</p>
        </div>
        <button onClick={() => void loadOrders()} className="px-4 py-2 border rounded-lg inline-flex items-center gap-2"><RefreshCcw size={16} /> Làm mới</button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm theo mã đơn, tên khách hoặc email..." className="w-full pl-10 pr-4 py-2 border rounded-lg" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Mã đơn</th>
                <th className="px-6 py-4 text-sm font-semibold">Khách hàng</th>
                <th className="px-6 py-4 text-sm font-semibold">Giá trị</th>
                <th className="px-6 py-4 text-sm font-semibold">Trạng thái đơn</th>
                <th className="px-6 py-4 text-sm font-semibold">Thanh toán</th>
                <th className="px-6 py-4 text-sm font-semibold">Ngày tạo</th>
                <th className="px-6 py-4 text-sm font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{order.orderNumber}</td>
                  <td className="px-6 py-4"><div className="font-medium text-gray-900">{order.customerName}</div><div className="text-xs text-gray-500">{order.customerEmail}</div></td>
                  <td className="px-6 py-4 font-bold text-orange-600">{formatVnd(order.finalAmount)}</td>
                  <td className="px-6 py-4">
                    <select value={order.status} onChange={(e) => void updateStatus(order.id, e.target.value, order.paymentStatus)} className="px-3 py-2 border rounded-lg text-sm">
                      <option value="pending">pending</option>
                      <option value="processing">processing</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                      <option value="refunded">refunded</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select value={order.paymentStatus} onChange={(e) => void updateStatus(order.id, order.status, e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                      <option value="failed">failed</option>
                      <option value="refunded">refunded</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleString("vi-VN")}</td>
                  <td className="px-6 py-4"><div className="flex gap-2 text-gray-500">
                    {order.status === "completed" && <CheckCircle size={18} className="text-green-600" />}
                    {order.status === "pending" && <Clock size={18} className="text-yellow-600" />}
                    {order.status === "cancelled" && <XCircle size={18} className="text-red-600" />}
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
