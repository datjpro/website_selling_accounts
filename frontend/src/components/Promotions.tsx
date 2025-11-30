import React, { useState } from "react";
import { PROMOTIONS } from "../constants";
import { Copy, Check, Gift } from "lucide-react";

const Promotions: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-4">
            <Gift size={16} className="text-orange-600" />
            <span className="text-sm font-semibold text-orange-600">
              Nhận ngay quà tặng
            </span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
            Khuyến mãi hấp dẫn
          </h2>
          <p className="text-gray-600">
            Tiết kiệm tới 50% với các mã giảm giá đặc biệt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              className={`${promo.bgColor} rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-white/20`}
            >
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>

              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-block mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-xs font-bold text-white rounded-full border border-white/30">
                      HOT DEAL 🔥
                    </span>
                  </div>
                  <h3
                    className={`text-2xl sm:text-3xl font-black mb-3 ${promo.textColor} leading-tight`}
                  >
                    {promo.title}
                  </h3>
                  <p
                    className={`mb-6 text-sm sm:text-base ${promo.textColor} opacity-90`}
                  >
                    {promo.description}
                  </p>

                  <div className="inline-flex items-center bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-xl p-1 pr-3 shadow-lg">
                    <span className="bg-white text-gray-900 font-bold px-4 py-2 rounded-lg text-sm mr-3 shadow-md">
                      CODE
                    </span>
                    <span
                      className={`font-mono font-bold tracking-wider text-lg mr-3 ${promo.textColor}`}
                    >
                      {promo.code}
                    </span>
                    <button
                      onClick={() => copyCode(promo.code)}
                      className={`p-2 hover:bg-white/20 rounded-lg transition-all ${promo.textColor}`}
                      title="Copy Code"
                    >
                      {copiedCode === promo.code ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="relative w-32 h-32 sm:w-44 sm:h-44 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full animate-pulse"></div>
                  <img
                    src={promo.image}
                    alt="Promotion"
                    className="relative w-full h-full object-cover rounded-full border-4 border-white/30 shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
