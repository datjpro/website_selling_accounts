import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Clock, Copy, Gift, Sparkles, Tag, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { promotionService, type Promotion } from "../services/promotionService";

const formatPromotionValue = (promotion: Promotion): string => {
  if (promotion.discountType === "percentage") {
    return `${promotion.discountValue}%`;
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(promotion.discountValue);
};

const getBadgeText = (promotion: Promotion): string => {
  if (promotion.badge) return promotion.badge;
  if (promotion.discountType === "percentage") return "HOT";
  return "SAVE";
};

const PromotionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPromotions = async () => {
      setLoading(true);
      try {
        const data = await promotionService.getActivePromotions();
        setPromotions(data);
      } catch (error) {
        console.error("Failed to load promotions", error);
        setPromotions([]);
      } finally {
        setLoading(false);
      }
    };

    void loadPromotions();
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "HOT":
        return "bg-gradient-to-r from-red-500 to-orange-500";
      case "FLASH":
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "VIP":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "MEGA":
        return "bg-gradient-to-r from-blue-500 to-indigo-500";
      default:
        return "bg-gradient-to-r from-green-500 to-emerald-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      <div className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-sm font-semibold text-white">Khuyến mãi đặc biệt</span>
            </div>
            <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
              Mã giảm giá hấp dẫn
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Chọn mã phù hợp và sao chép để dùng khi đặt hàng.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : promotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {promotions.map((promo) => {
              const badgeText = getBadgeText(promo);

              return (
                <div
                  key={promo.id}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-6 border-b border-gray-100 relative">
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full ${getBadgeColor(
                        badgeText
                      )} shadow-lg`}
                    >
                      <div className="flex items-center gap-1">
                        <Gift size={14} className="text-white" />
                        <span className="text-xs font-bold text-white">{badgeText}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Tag size={28} className="text-white" />
                      </div>
                      <div className="flex-1 pr-16">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{promo.title}</h3>
                        <p className="text-sm text-gray-600">{promo.description || "Khuyến mãi đang áp dụng"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="text-center py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                      <div className="text-xs text-gray-600 mb-1">Giảm giá</div>
                      <div className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {formatPromotionValue(promo)}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Zap size={16} className="text-orange-500" />
                        <span>
                          Đơn tối thiểu: {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(promo.minOrderAmount || 0)}
                        </span>
                      </div>
                      {promo.endDate && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={16} className="text-blue-500" />
                          <span>HSD: {new Date(promo.endDate).toLocaleDateString("vi-VN")}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => copyCode(promo.code)}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                    >
                      {copiedCode === promo.code ? (
                        <>
                          <Check size={18} />
                          Đã sao chép
                        </>
                      ) : (
                        <>
                          <Copy size={18} />
                          Copy mã: {promo.code}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">Hiện chưa có khuyến mãi khả dụng.</div>
        )}

        <div className="mt-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <Gift size={48} className="text-white mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white mb-4">Bắt đầu mua sắm ngay!</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Áp dụng mã giảm giá và tiết kiệm tối đa cho đơn hàng của bạn.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              Xem sản phẩm
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PromotionsPage;
