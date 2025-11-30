import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, Shield } from "lucide-react";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-[440px] p-8 sm:p-10 relative z-10 border border-white/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl mb-4 transform hover:scale-105 transition-transform">
            <Shield size={32} fill="currentColor" className="opacity-90" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            GameAccHub
          </span>
          <p className="text-sm text-gray-500 mt-1">Đăng nhập để tiếp tục</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Chào mừng trở lại! 👋
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <User size={20} />
            </div>
            <input
              type="text"
              placeholder="Tên đăng nhập hoặc Email"
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className="w-full pl-11 pr-11 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-blue-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex justify-end">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Quên mật khẩu?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1e60cd] hover:bg-[#1650b0] text-white font-bold py-3.5 rounded-lg shadow-md transition-all transform active:scale-[0.98]"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Chưa có tài khoản?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
