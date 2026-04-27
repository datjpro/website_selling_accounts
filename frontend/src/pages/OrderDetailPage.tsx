import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, CreditCard, Shield, Info, XCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { orderService, type Order } from "../services/orderService";

const formatVnd = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const OrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      if (!id) return;
      try {
        const data = await orderService.getOrderById(id);
        setOrder(data);
      } catch (err) {
        setError("Không thể tải thông tin đơn hàng.");
      } finally {
        setLoading(false);
      }
    };
    void loadOrder();
  }, [id]);

  const handleCancel = async () => {
    if (!order || cancelling) return;
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;

    setCancelling(true);
    try {
      const updatedOrder = await orderService.cancelOrder(order.id);
      setOrder(updatedOrder);
      alert("Hủy đơn hàng thành công.");
    } catch {
      alert("Không thể hủy đơn hàng.");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow max-w-2xl mx-auto py-24 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || "Không tìm thấy đơn hàng"}</h2>
          <button onClick={() => navigate("/user/dashboard")} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Quay lại Dashboard</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-5xl mx-auto py-12 px-4 w-full">
        <button onClick={() => navigate("/user/dashboard")} className="inline-flex items-center gap-2 text-blue-600 font-medium mb-8 hover:underline">
          <ArrowLeft size={18} /> Quay lại danh sách đơn hàng
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-black text-gray-900 mb-1">Chi tiết đơn hàng</h1>
                  <p className="text-gray-500 font-medium">{order.orderNumber}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold uppercase tracking-wider">{order.status}</span>
                  <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold uppercase tracking-wider">{order.paymentStatus}</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Sản phẩm đã mua</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-bold text-gray-900">{item.productName}</div>
                        <div className="font-black text-blue-600">{formatVnd(item.subtotal)}</div>
                      </div>

                      {order.status === "completed" && item.accountUsername ? (
                        <div className="bg-blue-600 rounded-lg p-5 text-white shadow-inner">
                          <div className="flex items-center gap-2 mb-3">
                            <Shield size={18} />
                            <span className="font-bold">Thông tin tài khoản</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="opacity-70 block mb-1">Tên đăng nhập / Email:</span>
                              <div className="bg-white/10 px-3 py-2 rounded font-mono break-all">{item.accountUsername}</div>
                            </div>
                            <div>
                              <span className="opacity-70 block mb-1">Mật khẩu:</span>
                              <div className="bg-white/10 px-3 py-2 rounded font-mono break-all">{item.accountPassword}</div>
                            </div>
                            {item.accountEmail && (
                              <div className="md:col-span-2">
                                <span className="opacity-70 block mb-1">Email khôi phục:</span>
                                <div className="bg-white/10 px-3 py-2 rounded font-mono break-all">{item.accountEmail}</div>
                              </div>
                            )}
                            {item.additionalInfo && (
                              <div className="md:col-span-2">
                                <span className="opacity-70 block mb-1">Ghi chú thêm:</span>
                                <div className="bg-white/10 px-3 py-2 rounded text-xs whitespace-pre-wrap">{item.additionalInfo}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-orange-50 text-orange-700 rounded-lg border border-orange-100">
                          <Info size={20} />
                          <p className="text-sm font-medium">Thông tin tài khoản sẽ hiển thị sau khi đơn hàng được hoàn tất.</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-600" /> Tóm tắt thanh toán
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatVnd(order.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span>-{formatVnd(order.discountAmount)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-black text-gray-900">
                  <span>Tổng tiền</span>
                  <span>{formatVnd(order.finalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" /> Lịch sử đơn hàng
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 bg-blue-500 rounded-full h-2 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">Đơn hàng được tạo</div>
                    <div className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString("vi-VN")}</div>
                  </div>
                </div>
                {order.paidAt && (
                  <div className="flex gap-3">
                    <div className="w-2 bg-green-500 rounded-full h-2 mt-1.5 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-gray-900">Thanh toán thành công</div>
                      <div className="text-xs text-gray-500">{new Date(order.paidAt).toLocaleString("vi-VN")}</div>
                    </div>
                  </div>
                )}
                {order.completedAt && (
                  <div className="flex gap-3">
                    <div className="w-2 bg-green-500 rounded-full h-2 mt-1.5 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-gray-900">Đơn hàng hoàn tất</div>
                      <div className="text-xs text-gray-500">{new Date(order.completedAt).toLocaleString("vi-VN")}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {order.status === "pending" && (
              <button
                disabled={cancelling}
                onClick={handleCancel}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-200 transition-all"
              >
                <XCircle size={18} /> {cancelling ? "Đang xử lý..." : "Hủy đơn hàng"}
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetailPage;




