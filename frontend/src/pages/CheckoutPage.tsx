import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { orderService } from "../services/orderService";
import { promotionService } from "../services/promotionService";
import {
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  Tag,
} from "lucide-react";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    customerName: user?.fullName || user?.username || "",
    customerEmail: user?.email || "",
    customerPhone: user?.phone || "",
    paymentMethod: "momo",
    customerNote: "",
    promotionCode: "",
  });

  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    {
      id: "momo",
      name: "MoMo",
      icon: Smartphone,
      description: "Thanh toÃ¡n qua vÃ­ MoMo",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "zalopay",
      name: "ZaloPay",
      icon: Smartphone,
      description: "Thanh toÃ¡n qua vÃ­ ZaloPay",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "bank",
      name: "Chuyá»ƒn khoáº£n",
      icon: Building2,
      description: "Chuyá»ƒn khoáº£n ngÃ¢n hÃ ng",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "card",
      name: "Tháº» ATM/Visa",
      icon: CreditCard,
      description: "Thanh toÃ¡n báº±ng tháº»",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const handleApplyPromo = async () => {
    if (!formData.promotionCode.trim()) {
      error("Vui lÃ²ng nháº­p mÃ£ giáº£m giÃ¡");
      return;
    }

    try {
      const result = await promotionService.validatePromotion(
        formData.promotionCode.trim(),
        getCartTotal()
      );

      if (!result.valid) {
        setDiscount(0);
        setPromoApplied(false);
        error(result.message || "MÃ£ giáº£m giÃ¡ khÃ´ng há»£p lá»‡");
        return;
      }

      setDiscount(result.discountAmount || 0);
      setPromoApplied(true);
      success(result.message || "Ãp dá»¥ng mÃ£ giáº£m giÃ¡ thÃ nh cÃ´ng!");
    } catch (applyError) {
      setDiscount(0);
      setPromoApplied(false);
      error("KhÃ´ng thá»ƒ kiá»ƒm tra mÃ£ giáº£m giÃ¡");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      error("Vui lÃ²ng Ä‘Äƒng nháº­p Ä‘á»ƒ tiáº¿p tá»¥c");
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      error("Giá» hÃ ng trá»‘ng");
      return;
    }

    try {
      setIsSubmitting(true);

      const order = await orderService.createOrder({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone || undefined,
        paymentMethod: formData.paymentMethod,
        customerNote: formData.customerNote || undefined,
        promotionCode: promoApplied ? formData.promotionCode.trim() : undefined,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      });

      clearCart();
      success(`Äáº·t hÃ ng thÃ nh cÃ´ng! MÃ£ Ä‘Æ¡n: ${order.orderNumber}`);
      navigate(`/user/orders/${order.id}`);
    } catch (submitError) {
      error("Äáº·t hÃ ng tháº¥t báº¡i. Vui lÃ²ng thá»­ láº¡i.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = getCartTotal();
  const finalTotal = subtotal - discount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Thanh toÃ¡n</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  ThÃ´ng tin khÃ¡ch hÃ ng
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Há» vÃ  tÃªn <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerEmail: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sá»‘ Ä‘iá»‡n thoáº¡i <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerPhone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ghi chÃº Ä‘Æ¡n hÃ ng
                    </label>
                    <textarea
                      value={formData.customerNote}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customerNote: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ghi chÃº thÃªm vá» Ä‘Æ¡n hÃ ng..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  PhÆ°Æ¡ng thá»©c thanh toÃ¡n
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                          formData.paymentMethod === method.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              paymentMethod: e.target.value,
                            })
                          }
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center`}
                          >
                            <Icon size={24} className="text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {method.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        {formData.paymentMethod === method.id && (
                          <CheckCircle
                            className="absolute top-4 right-4 text-blue-600"
                            size={24}
                          />
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  ÄÆ¡n hÃ ng
                </h2>

                {/* Products */}
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        {(item.product.price * item.quantity).toLocaleString(
                          "vi-VN"
                        )}
                        Ä‘
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    MÃ£ giáº£m giÃ¡
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={formData.promotionCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          promotionCode: e.target.value,
                        })
                      }
                      disabled={promoApplied}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="Nháº­p mÃ£ giáº£m giÃ¡"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                    >
                      <Tag size={20} />
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Táº¡m tÃ­nh</span>
                    <span className="font-semibold">
                      {subtotal.toLocaleString("vi-VN")}Ä‘
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giáº£m giÃ¡</span>
                      <span className="font-semibold">
                        -{discount.toLocaleString("vi-VN")}Ä‘
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3">
                    <span>Tá»•ng cá»™ng</span>
                    <span className="text-blue-600">
                      {finalTotal.toLocaleString("vi-VN")}Ä‘
                    </span>
                  </div>
                </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Äang táº¡o Ä‘Æ¡n hÃ ng..." : "HoÃ n táº¥t Ä‘áº·t hÃ ng"}
                  </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

