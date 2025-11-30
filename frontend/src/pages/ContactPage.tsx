import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Zap,
  Facebook,
  MessageSquare,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.");
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Hotline",
      value: "1900-xxxx",
      description: "Hỗ trợ 24/7",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@gameacchub.vn",
      description: "Phản hồi trong 2h",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      value: "Chat ngay",
      description: "Trực tuyến 24/7",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: MapPin,
      title: "Địa chỉ",
      value: "Hà Nội, Việt Nam",
      description: "Làm việc 8h-22h",
      color: "from-orange-500 to-red-500",
    },
  ];

  const faqs = [
    {
      q: "Làm sao để mua tài khoản?",
      a: "Chọn tài khoản phù hợp, thêm vào giỏ hàng và thanh toán. Sau khi thanh toán, bạn sẽ nhận được thông tin tài khoản qua email.",
    },
    {
      q: "Có bảo hành không?",
      a: "Tất cả tài khoản đều được bảo hành đổi trả trong 7 ngày nếu có vấn đề kỹ thuật.",
    },
    {
      q: "Thanh toán như thế nào?",
      a: "Chúng tôi hỗ trợ thanh toán qua thẻ ngân hàng, ví điện tử (MoMo, ZaloPay, ShopeePay), và chuyển khoản.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Đội ngũ hỗ trợ chuyên nghiệp sẵn sàng giúp bạn 24/7
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1 group cursor-pointer"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
              >
                <method.icon size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
              <p className="text-lg font-bold text-blue-600 mb-1">
                {method.value}
              </p>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              Gửi tin nhắn cho chúng tôi
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                    placeholder="0123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tiêu đề *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors"
                  placeholder="Vấn đề bạn cần hỗ trợ"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nội dung *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 outline-none transition-colors resize-none"
                  placeholder="Chi tiết vấn đề bạn cần hỗ trợ..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Send size={20} />
                Gửi tin nhắn
              </button>
            </form>
          </div>

          {/* FAQ & Additional Info */}
          <div className="space-y-6">
            {/* Working Hours */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
              <Clock size={40} className="mb-4" />
              <h3 className="text-2xl font-black mb-4">Giờ làm việc</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="font-medium">Thứ 2 - Thứ 6</span>
                  <span className="font-bold">8:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="font-medium">Thứ 7 - Chủ nhật</span>
                  <span className="font-bold">9:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Hỗ trợ khẩn cấp</span>
                  <span className="font-bold flex items-center gap-1">
                    <Zap size={16} />
                    24/7
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-4">
                Kết nối với chúng tôi
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Facebook size={20} className="text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Facebook</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Zalo</span>
                </button>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-4">
                Câu hỏi thường gặp
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="pb-4 border-b border-gray-100 last:border-0"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-sm text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
