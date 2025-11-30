import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();
  const navigate = useNavigate();
  const { success } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <ShoppingCart size={80} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-500 mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <span>Tiếp tục mua sắm</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Giỏ hàng của bạn
          </h1>
          <p className="text-gray-500">
            Bạn có {items.length} sản phẩm trong giỏ hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={
                      item.product.images?.[0]?.imageUrl ||
                      "https://via.placeholder.com/100"
                    }
                    alt={item.product.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {item.product.gameTitle}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {item.product.price.toLocaleString("vi-VN")}đ
                      </span>
                      {item.product.originalPrice &&
                        item.product.originalPrice > item.product.price && (
                          <span className="text-sm text-gray-400 line-through">
                            {item.product.originalPrice.toLocaleString("vi-VN")}
                            đ
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      disabled={item.quantity >= item.product.stockQuantity}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      removeFromCart(item.product.id);
                      success("Đã xóa sản phẩm khỏi giỏ hàng");
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Tóm tắt đơn hàng
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span className="font-semibold">
                    {getCartTotal().toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí dịch vụ</span>
                  <span className="font-semibold">0đ</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Tổng cộng</span>
                    <span className="text-blue-600">
                      {getCartTotal().toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold hover:shadow-xl transition-all mb-3"
              >
                Tiến hành thanh toán
              </button>

              <button
                onClick={() => {
                  clearCart();
                  success("Đã xóa toàn bộ giỏ hàng");
                }}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Xóa giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
