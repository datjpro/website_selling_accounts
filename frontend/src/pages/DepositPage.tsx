import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, User, Wallet, CreditCard, Sparkles } from "lucide-react";

const DepositPage: React.FC = () => {
  const [amount, setAmount] = useState("100.000đ");
  const [method, setMethod] = useState("momo");
  const navigate = useNavigate();

  const amounts = ["50.000đ", "100.000đ", "200.000đ", "500.000đ"];

  const paymentMethods = [
    {
      id: "napas",
      name: "Thẻ ngân hàng",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Logo_Napas.svg/2560px-Logo_Napas.svg.png",
    },
    {
      id: "visa",
      name: "Thẻ quốc tế",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
    },
    {
      id: "momo",
      name: "Ví MoMo",
      logo: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
    },
    {
      id: "zalopay",
      name: "ZaloPay",
      logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png",
    },
    {
      id: "shopeepay",
      name: "ShopeePay",
      logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ShopeePay-V.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform shadow-md">
                  <Wallet size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-blue-900 leading-none">
                    GameAccHub
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">
                    Nạp tiền nhanh chóng
                  </span>
                </div>
              </button>

              <nav className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => navigate("/")}
                  className="px-4 py-2 rounded-lg font-medium text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                >
                  Trang chủ
                </button>
                <button className="px-4 py-2 rounded-lg font-medium text-sm bg-blue-50 text-blue-600">
                  Nạp tiền
                </button>
                <button className="px-4 py-2 rounded-lg font-medium text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
                  Lịch sử
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl pl-3 pr-4 py-2 border border-blue-100">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
                <User size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Số dư
                </span>
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-none">
                  150.000đ
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Page Title */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-4 border border-white/30">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-sm font-semibold text-white">
                Nạp tiền siêu tốc
              </span>
            </div>
            <h1 className="text-4xl font-black text-white mb-3 drop-shadow-lg">
              Nạp Tiền Vào Tài Khoản
            </h1>
            <p className="text-blue-100">
              Chọn số tiền và phương thức thanh toán phù hợp
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8 sm:p-10 space-y-8">
              {/* Amount Selection */}
              <section>
                <label className="flex items-center gap-2 text-base font-bold text-gray-800 mb-5">
                  <CreditCard size={20} className="text-blue-600" />
                  Chọn số tiền nạp
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className={`py-4 px-5 rounded-xl border-2 font-bold transition-all ${
                        amount === amt
                          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-lg scale-105"
                          : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                  <div className="col-span-2 sm:col-span-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Khác"
                        className="w-full py-4 px-5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-700 font-bold transition-colors"
                      />
                      <span className="absolute right-4 top-4 text-gray-400 text-sm font-bold">
                        VND
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Method Selection */}
              <section>
                <label className="flex items-center gap-2 text-base font-bold text-gray-800 mb-5">
                  <Wallet size={20} className="text-blue-600" />
                  Phương thức thanh toán
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setMethod(pm.id)}
                      className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all h-32 ${
                        method === pm.id
                          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-12 h-12 mb-3 flex items-center justify-center">
                        <img
                          src={pm.logo}
                          alt={pm.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-semibold text-center text-gray-700 leading-tight">
                        {pm.name}
                      </span>
                      {method === pm.id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Summary Footer */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="block text-gray-600 text-sm font-medium mb-2">
                    Tổng thanh toán:
                  </span>
                  <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {amount}
                  </span>
                </div>
                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-10 rounded-xl shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1">
                  <Lock size={20} />
                  Nạp ngay
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium bg-green-50 py-3 px-4 rounded-xl border border-green-100">
                <ShieldCheck size={18} />
                <span>
                  Bảo mật SSL • Thanh toán an toàn • Hỗ trợ 24/7
                </span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm bg-white/50 backdrop-blur-md rounded-2xl p-6 border border-white/50">
            <div className="flex gap-6 mb-4 sm:mb-0">
              <a href="#" className="hover:text-blue-600 transition-colors font-medium">
                Điều khoản
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors font-medium">
                Bảo mật
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors font-medium">
                Hỗ trợ
              </a>
            </div>
            <div className="flex gap-4 items-center opacity-70">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Logo_Napas.svg/2560px-Logo_Napas.svg.png"
                className="h-5"
                alt="napas"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                className="h-5"
                alt="visa"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                className="h-5"
                alt="mastercard"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                className="h-5"
                alt="momo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;

  const amounts = ["50.000đ", "100.000đ", "200.000đ", "500.000đ"];

  const paymentMethods = [
    {
      id: "napas",
      name: "Thẻ ngân hàng nội địa",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Logo_Napas.svg/2560px-Logo_Napas.svg.png",
    },
    {
      id: "visa",
      name: "Thẻ quốc tế",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
    },
    {
      id: "momo",
      name: "Ví MoMo",
      logo: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
    },
    {
      id: "zalopay",
      name: "ZaloPay",
      logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png",
    },
    {
      id: "shopeepay",
      name: "ShopeePay",
      logo: "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ShopeePay-V.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Specific to Deposit Page */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                  G
                </div>
                <span className="font-bold text-xl text-blue-900 tracking-tight">
                  GameAccHub
                </span>
              </button>

              <nav className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => navigate("/")}
                  className="text-gray-500 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  Trang chủ
                </button>
                <button className="text-gray-500 hover:text-blue-600 font-medium text-sm transition-colors">
                  Cửa hàng
                </button>
                <button className="text-blue-600 font-bold text-sm border-b-2 border-blue-600 py-5">
                  Nạp tiền
                </button>
                <button className="text-gray-500 hover:text-blue-600 font-medium text-sm transition-colors">
                  Hỗ trợ
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-3 bg-gray-100 rounded-full pl-2 pr-4 py-1.5 border border-gray-200">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                <User size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  Số dư
                </span>
                <span className="text-sm font-bold text-blue-700 leading-none">
                  150.000đ
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 transform -skew-y-2 origin-top-left scale-110 -translate-y-10 z-0"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-md">
            Trang nạp tiền
          </h1>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 bg-blue-50/50 border-b border-blue-100">
              <h2 className="text-xl font-bold text-gray-900">
                Nạp tiền vào tài khoản
              </h2>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Amount Selection */}
              <section>
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                  Chọn số tiền nạp
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt)}
                      className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                        amount === amt
                          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                          : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                  <div className="col-span-2 sm:col-span-1 relative">
                    <label className="absolute -top-6 left-0 text-xs text-gray-500 font-medium">
                      Số tiền khác
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="100.000đ"
                        className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none text-gray-700 font-bold transition-colors"
                      />
                      <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-bold">
                        VND
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Method Selection */}
              <section>
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                  Chọn phương thức thanh toán
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setMethod(pm.id)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all h-32 ${
                        method === pm.id
                          ? "border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-500"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="w-12 h-12 mb-3 flex items-center justify-center">
                        <img
                          src={pm.logo}
                          alt={pm.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-semibold text-center text-gray-700 leading-tight">
                        {pm.name}
                      </span>
                      {method === pm.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Summary Footer */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="block text-gray-500 text-sm font-medium mb-1">
                    Tổng cộng thanh toán:
                  </span>
                  <span className="text-3xl font-extrabold text-gray-900">
                    {amount}
                  </span>
                </div>
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                  <Lock size={18} />
                  Nạp ngay
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-green-600 text-xs sm:text-sm font-medium">
                <ShieldCheck size={16} />
                <span>
                  Giao dịch được bảo mật bởi SSL. Thanh toán an toàn và nhanh
                  chóng.
                </span>
              </div>
            </div>
          </div>

          {/* Footer Badges */}
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
            <div className="flex gap-6 mb-4 sm:mb-0">
              <a href="#" className="hover:text-gray-700 transition-colors">
                Điều khoản
              </a>
              <a href="#" className="hover:text-gray-700 transition-colors">
                Bảo mật
              </a>
              <a href="#" className="hover:text-gray-700 transition-colors">
                Liên hệ
              </a>
            </div>
            <div className="flex gap-3 grayscale opacity-70">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Logo_Napas.svg/2560px-Logo_Napas.svg.png"
                className="h-4"
                alt="napas"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                className="h-4"
                alt="visa"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                className="h-4"
                alt="mastercard"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                className="h-4"
                alt="momo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
