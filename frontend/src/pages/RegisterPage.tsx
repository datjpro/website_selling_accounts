import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import axios from "axios";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { success, error } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const emailError = useMemo(() => {
    if (!formData.email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(formData.email);
  }, [formData.email]);

  const confirmPasswordError =
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword;

  const handleChange = (field: keyof typeof formData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.username.trim()) {
      error("Vui lòng nhập tên đăng nhập");
      return;
    }

    if (!formData.email.trim() || emailError) {
      error("Email không hợp lệ");
      return;
    }

    if (formData.password.length < 8) {
      error("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }

    if (confirmPasswordError) {
      error("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setIsSubmitting(true);
      await register(
        formData.username.trim(),
        formData.email.trim(),
        formData.password,
        formData.fullName.trim() || undefined
      );
      success("Đăng ký thành công");
      navigate("/");
    } catch (registerError) {
      if (axios.isAxiosError(registerError)) {
        if (!registerError.response) {
          error("Không kết nối được backend tại http://localhost:3000/api. Hãy kiểm tra `npm run dev` và API health.");
          return;
        }

        const message =
          (registerError.response?.data as { message?: string } | undefined)
            ?.message ||
          `Đăng ký thất bại (${registerError.response.status}).`;
        error(message);
      } else if (registerError instanceof Error) {
        error(registerError.message);
      } else {
        error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0f111a] text-white font-sans overflow-hidden">
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-[#050608]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-[500px] h-[500px] mb-8">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070"
              alt="Gaming"
              className="w-full h-full object-cover rounded-3xl shadow-2xl opacity-80"
              style={{
                maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 50%, transparent 100%)",
              }}
            />
            <div className="absolute inset-0 border-4 border-purple-500/30 rounded-3xl transform rotate-6 scale-90"></div>
          </div>

          <h1 className="text-center text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              SHOPACC:
            </span>{" "}
            Gia nhập thế
            <br />
            giới game đỉnh cao.
          </h1>
        </div>

        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-[#13161f]">
        <div className="w-full max-w-[480px] bg-[#1a1f2e]/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/5">
          <h2 className="text-3xl font-black text-center mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Đăng Ký Tài Khoản
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8 rounded-full"></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tên đăng nhập
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={handleChange("username")}
                className="w-full px-4 py-3 rounded-lg bg-[#242936] border border-gray-700/50 text-white outline-none focus:border-purple-500"
                placeholder="Nhập tên đăng nhập"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={handleChange("fullName")}
                className="w-full px-4 py-3 rounded-lg bg-[#242936] border border-gray-700/50 text-white outline-none focus:border-purple-500"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  className={`w-full px-4 py-3 rounded-lg bg-[#242936] border text-white outline-none ${
                    emailError ? "border-red-500" : "border-gray-700/50 focus:border-purple-500"
                  }`}
                  placeholder="Nhập email"
                />
                {emailError && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400" size={18} />
                )}
              </div>
              {emailError && (
                <p className="mt-2 text-sm text-red-400">Email không đúng định dạng.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange("password")}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-[#242936] border border-gray-700/50 text-white outline-none focus:border-purple-500"
                  placeholder="Nhập mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  className={`w-full px-4 py-3 pr-12 rounded-lg bg-[#242936] border text-white outline-none ${
                    confirmPasswordError
                      ? "border-red-500"
                      : "border-gray-700/50 focus:border-purple-500"
                  }`}
                  placeholder="Nhập lại mật khẩu"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="mt-2 text-sm text-red-400">Mật khẩu xác nhận không khớp.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all"
            >
              {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-6">
            Đã có tài khoản?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-400 hover:text-pink-400 font-semibold"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
