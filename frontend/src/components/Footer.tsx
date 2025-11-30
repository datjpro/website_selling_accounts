import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Mail,
  Phone,
  MapPin,
  Gamepad2,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Gamepad2 size={22} />
              </div>
              <span className="font-bold text-xl tracking-tight">
                GameAccHub
              </span>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed text-sm">
              Sàn giao dịch tài khoản game uy tín hàng đầu Việt Nam. Cam kết
              mang lại trải nghiệm an toàn, nhanh chóng.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                <Mail size={16} className="text-blue-400" />
                <span>support@gameacchub.vn</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                <Phone size={16} className="text-blue-400" />
                <span>1900 xxxx</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors">
                <MapPin size={16} className="text-blue-400" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></span>
              Liên kết nhanh
            </h3>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:pl-2 transition-all flex items-center gap-2"
                >
                  → Tài khoản
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:pl-2 transition-all flex items-center gap-2"
                >
                  → Về chúng tôi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:pl-2 transition-all flex items-center gap-2"
                >
                  → Liên hệ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:pl-2 transition-all flex items-center gap-2"
                >
                  → Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></span>
              Hỗ trợ
            </h3>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:pl-2 transition-all flex items-center gap-2"
                >
                  → Chính sách Bảo mật
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:pl-2 transition-all flex items-center gap-2"
                >
                  → Điều khoản Sử dụng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:pl-2 transition-all flex items-center gap-2"
                >
                  → Hoàn tiền & Đổi trả
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:pl-2 transition-all flex items-center gap-2"
                >
                  → Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></span>
              Theo dõi chúng tôi
            </h3>
            <p className="text-blue-100 text-sm mb-4">
              Đăng ký nhận tin khuyến mãi mới nhất
            </p>
            <div className="flex relative mb-6">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="w-full bg-white/10 backdrop-blur-md text-white placeholder-blue-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20 text-sm"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-lg transition-all shadow-lg">
                <Send size={16} />
              </button>
            </div>

            <div className="mt-6">
              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg transition-all border border-white/20 hover:scale-110"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="p-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg transition-all border border-white/20 hover:scale-110"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="p-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg transition-all border border-white/20 hover:scale-110"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="p-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-lg transition-all border border-white/20 hover:scale-110"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200 text-sm text-center md:text-left">
              © 2024 GameAccHub. All rights reserved. Made with ❤️ in Vietnam
            </p>
            <div className="flex gap-4 items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Logo_Napas.svg/2560px-Logo_Napas.svg.png"
                className="h-6 opacity-60 hover:opacity-100 transition-opacity"
                alt="napas"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                className="h-6 opacity-60 hover:opacity-100 transition-opacity"
                alt="visa"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                className="h-6 opacity-60 hover:opacity-100 transition-opacity"
                alt="mastercard"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                className="h-6 opacity-60 hover:opacity-100 transition-opacity"
                alt="momo"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
