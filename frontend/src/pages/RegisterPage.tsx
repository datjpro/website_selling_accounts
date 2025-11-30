import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    navigate("/");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(value.length > 0 && !emailRegex.test(value));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0f111a] text-white font-sans overflow-hidden">
      {/* Left Side - Hero/Banner */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-[#050608]">
        {/* Neon Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-[500px] h-[500px] mb-8">
            {/* Placeholder for the gamepad image */}
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070"
              alt="Gaming"
              className="w-full h-full object-cover rounded-3xl shadow-2xl opacity-80"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 50%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 50%, transparent 100%)",
              }}
            />
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-3xl transform rotate-6 scale-90"></div>
          </div>

          <h1 className="text-center text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              GAMEACCHUB:
            </span>{" "}
            Gia nhập thế
            <br />
            giới game đỉnh cao.
          </h1>
        </div>

        {/* Tech lines background */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-[#13161f]">
        <div className="w-full max-w-[480px] bg-[#1a1f2e]/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/5">
          <h2 className="text-2xl font-bold text-center mb-1 text-gray-100">
            Trang đăng ký
          </h2>
          <div className="h-1 w-12 bg-purple-500 mx-auto mb-8 rounded-full"></div>

          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 bg-[#242936] hover:bg-[#2e3545] border border-gray-700/50 rounded-lg py-3 transition-all group">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                Đăng ký bằng Google
              </span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-[#242936] hover:bg-[#2e3545] border border-gray-700/50 rounded-lg py-3 transition-all group">
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                Đăng ký bằng Facebook
              </span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1a1f2e] text-gray-500">Hoặc</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Tên người dùng
              </label>
              <input
                type="text"
                placeholder="Nhập tên hiển thị"
                className="w-full bg-[#242936] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="example@email.com"
                className={`w-full bg-[#242936] border ${
                  emailError
                    ? "border-red-500/50 bg-[#2d1b1b]/50"
                    : "border-gray-700"
                } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
              />
              {emailError && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5 font-medium">
                  <AlertCircle size={14} /> Địa chỉ email không hợp lệ. Vui lòng
                  thử lại.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Tối thiểu 8 ký tự"
                  className="w-full bg-[#242936] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-600 bg-[#242936] checked:border-purple-500 checked:bg-purple-500 transition-all"
                />
                <svg
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <label
                htmlFor="terms"
                className="text-sm text-gray-400 cursor-pointer select-none"
              >
                Tôi đồng ý với{" "}
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 hover:underline"
                >
                  Điều khoản & Chính sách
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Đăng ký ngay
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Đã có tài khoản?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors"
            >
              Đăng nhập
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
