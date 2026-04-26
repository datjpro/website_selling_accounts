import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Copy, Gift } from "lucide-react";
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

const Promotions: React.FC = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const data = await promotionService.getActivePromotions();
        setPromotions(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to load homepage promotions", error);
        setPromotions([]);
      }
    };

    void loadPromotions();
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold mb-4 shadow-lg">
            <Gift size={16} /> Ưu đãi hôm nay
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Khuyến mãi đặc biệt</h2>
          <p className="text-gray-500">Sao chép mã giảm giá để dùng khi thanh toán</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="group relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative p-8 z-10">
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-xs font-bold text-white rounded-full border border-white/30">
                      HOT DEAL 🔥
                    </span>
                  </div>
                  <button
                    onClick={() => copyCode(promo.code)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-all text-white"
                    title="Copy Code"
                  >
                    {copiedCode === promo.code ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black mb-3 text-white leading-tight">
                  {promo.title}
                </h3>
                <p className="mb-6 text-sm sm:text-base text-white/90">
                  {promo.description || "Ưu đãi đang áp dụng cho đơn hàng phù hợp"}
                </p>

                <div className="mb-6 text-3xl font-black text-yellow-200">
                  {formatPromotionValue(promo)}
                </div>

                <div className="inline-flex items-center bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-xl p-1 pr-3 shadow-lg">
                  <span className="bg-white text-gray-900 font-bold px-4 py-2 rounded-lg text-sm mr-3 shadow-md">
                    CODE
                  </span>
                  <span className="font-mono font-bold tracking-wider text-lg mr-3 text-white">
                    {promo.code}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/promotions")}
            className="inline-flex items-center px-6 py-3 rounded-xl bg-white border border-purple-200 text-purple-700 font-bold shadow-sm hover:shadow-md"
          >
            Xem tất cả khuyến mãi
          </button>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
