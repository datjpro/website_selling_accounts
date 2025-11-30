import React from "react";
import { Sparkles, TrendingUp, Shield } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <img
          src="https://picsum.photos/seed/hero_gaming/1920/600"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-white/30 rounded-full text-white/90 text-sm font-semibold bg-white/10 backdrop-blur-md">
              <Sparkles size={16} className="text-yellow-300" />
              Nền tảng #1 Việt Nam
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Mua Bán Tài Khoản Game
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
                Uy Tín & An Toàn
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg leading-relaxed">
              Hàng ngàn tài khoản game chất lượng cao, giao dịch bảo mật, thanh
              toán nhanh chóng.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-blue-200">Tài khoản</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-blue-200">Khách hàng</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-blue-200">Hỗ trợ</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-blue-900 hover:bg-gray-100 font-bold py-3.5 px-8 rounded-xl shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2">
                <TrendingUp size={20} />
                Khám Phá Ngay
              </button>
              <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 font-bold py-3.5 px-8 rounded-xl transition-all flex items-center gap-2">
                <Shield size={20} />
                Tìm Hiểu Thêm
              </button>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl"></div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"
                  alt="Gaming"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
