
import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Shield } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-gray-100 to-transparent pointer-events-none"></div>
      
      {/* Geometric lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
         <path d="M0 100 L100 0 M20 100 L100 20 M0 80 L80 0" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[420px] p-8 sm:p-10 relative z-10 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white shadow-lg">
                <Shield size={24} fill="currentColor" className="opacity-90"/>
             </div>
             <span className="text-2xl font-bold text-gray-800 tracking-tight">GameVault</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Đăng nhập vào tài khoản</h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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
             <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">Quên mật khẩu?</a>
          </div>

          <button 
             type="submit"
             onClick={() => onNavigate('home')}
             className="w-full bg-[#1e60cd] hover:bg-[#1650b0] text-white font-bold py-3.5 rounded-lg shadow-md transition-all transform active:scale-[0.98]"
          >
             Đăng nhập
          </button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-gray-600 text-sm">
             Chưa có tài khoản? <button onClick={() => onNavigate('register')} className="text-blue-600 font-semibold hover:underline">Đăng ký ngay</button>
           </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
