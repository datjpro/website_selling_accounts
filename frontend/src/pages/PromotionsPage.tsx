import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gift, Copy, Check, Clock, Tag, Sparkles, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Promotion {
  id: number;
  code: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  minPurchase?: string;
  badge?: string;
}

const PromotionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const promotions: Promotion[] = [
    {
      id: 1,
      code: "WELCOME50",
      title: "Giảm 50K cho người mới",
      description: "Áp dụng cho đơn hàng đầu tiên từ 200K",
      discount: "50.000đ",
      validUntil: "31/12/2024",
      minPurchase: "200.000đ",
      badge: "HOT",
    },
    {
      id: 2,
      code: "FLASH100",
      title: "Flash Sale - Giảm 100K",
      description: "Chỉ hôm nay! Đơn từ 500K trở lên",
      discount: "100.000đ",
      validUntil: "30/11/2024",
      minPurchase: "500.000đ",
      badge: "FLASH",
    },
    {
      id: 3,
      code: "VIP200",
      title: "Ưu đãi VIP - Giảm 200K",
      description: "Dành cho thành viên VIP, đơn từ 1 triệu",
      discount: "200.000đ",
      validUntil: "15/12/2024",
      minPurchase: "1.000.000đ",
      badge: "VIP",
    },
    {
      id: 4,
      code: "WEEKEND30",
      title: "Cuối tuần vui vẻ",
      description: "Giảm 30K mọi đơn hàng cuối tuần",
      discount: "30.000đ",
      validUntil: "01/12/2024",
    },
    {
      id: 5,
      code: "LOYAL150",
      title: "Tri ân khách hàng",
      description: "Dành cho khách mua từ 3 lần trở lên",
      discount: "150.000đ",
      validUntil: "20/12/2024",
      minPurchase: "800.000đ",
    },
    {
      id: 6,
      code: "MEGA500",
      title: "Mega Sale - Giảm 500K",
      description: "Đơn hàng từ 3 triệu - Siêu ưu đãi",
      discount: "500.000đ",
      validUntil: "31/12/2024",
      minPurchase: "3.000.000đ",
      badge: "MEGA",
    },
  ];

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

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-sm font-semibold text-white">
                Khuyến mãi đặc biệt
              </span>
            </div>
            <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
              Ưu Đãi Hấp Dẫn
            </h1>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Săn mã giảm giá cực khủng - Tiết kiệm tối đa cho mọi giao dịch
            </p>
            <div className="flex items-center justify-center gap-8 text-white">
              <div className="text-center">
                <div className="text-3xl font-black">{promotions.length}</div>
                <div className="text-sm text-orange-100">Mã ưu đãi</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-black">500K</div>
                <div className="text-sm text-orange-100">Giảm tối đa</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-black">24/7</div>
                <div className="text-sm text-orange-100">Hỗ trợ</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
                {promo.badge && (
                  <div className="absolute top-4 right-4">
                    <div
                      className={`${getBadgeColor(
                        promo.badge
                      )} px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg`}
                    >
                      <Gift size={14} className="text-white" />
                      <span className="text-xs font-bold text-white">
                        {promo.badge}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Tag size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {promo.title}
                    </h3>
                    <p className="text-sm text-gray-600">{promo.description}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Discount Amount */}
                <div className="text-center py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                  <div className="text-xs text-gray-600 mb-1">Giảm giá</div>
                  <div className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {promo.discount}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  {promo.minPurchase && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Zap size={16} className="text-orange-500" />
                      <span>Đơn tối thiểu: {promo.minPurchase}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} className="text-blue-500" />
                    <span>HSD: {promo.validUntil}</span>
                  </div>
                </div>

                {/* Copy Code Button */}
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
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <Gift size={48} className="text-white mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white mb-4">
              Bắt đầu mua sắm ngay!
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Áp dụng mã giảm giá và tiết kiệm tối đa cho đơn hàng của bạn
            </p>
            <button
              onClick={() => navigate("/")}
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
