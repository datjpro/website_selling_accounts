import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Star,
  Shield,
  Zap,
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FEATURED_ACCOUNTS } from "../constants";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Find product by ID
  const product =
    FEATURED_ACCOUNTS.find((acc) => acc.id === Number(id)) ||
    FEATURED_ACCOUNTS[0];

  const images = [
    product.image,
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800",
  ];

  const features = [
    { icon: Shield, text: "Bảo hành 7 ngày đổi trả", color: "text-green-600" },
    {
      icon: Zap,
      text: "Giao tài khoản ngay lập tức",
      color: "text-yellow-600",
    },
    {
      icon: CheckCircle,
      text: "Xác thực tài khoản 100%",
      color: "text-blue-600",
    },
    { icon: Users, text: "Hỗ trợ 24/7", color: "text-purple-600" },
  ];

  const accountDetails = [
    { label: "Game", value: product.gameTitle },
    { label: "Mô tả", value: product.description },
    { label: "Số tướng/vũ khí", value: "150+ tướng" },
    { label: "Skin hiếm", value: "50+ skin limited" },
    { label: "Trạng thái", value: "Sẵn sàng giao" },
    { label: "Tình trạng", value: "Chưa liên kết FB" },
  ];

  const relatedProducts = FEATURED_ACCOUNTS.filter(
    (acc) => acc.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <button onClick={() => navigate("/")} className="hover:text-blue-600">
            Trang chủ
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/products")}
            className="hover:text-blue-600"
          >
            Sản phẩm
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.gameTitle}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-4 border border-gray-100">
              <img
                src={images[selectedImage]}
                alt={product.gameTitle}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-blue-500 shadow-lg scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-3">
                  {product.gameTitle}
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">
                  {product.description}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className="text-yellow-500 fill-yellow-500"
                      />
                    ))}
                    <span className="text-sm font-bold text-gray-700 ml-2">
                      (4.8/5)
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">156 đánh giá</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart size={20} className={isFavorite ? "fill-white" : ""} />
                </button>
                <button className="w-12 h-12 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-all">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 mb-6 border-2 border-orange-100">
              <div className="flex items-end gap-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Giá bán</div>
                  <div className="text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {product.price}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500 line-through">
                    2,000,000₫
                  </span>
                  <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                    -30%
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                >
                  <feature.icon size={20} className={feature.color} />
                  <span className="text-sm font-medium text-gray-700">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <ShoppingCart size={20} />
                Mua ngay
              </button>
              <button className="px-6 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all">
                Liên hệ
              </button>
            </div>

            {/* Trust Badges */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-2 text-green-700 font-bold mb-2">
                <Shield size={20} />
                Cam kết của chúng tôi
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  100% tài khoản thật, không clone
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Bảo hành đổi trả trong 7 ngày
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  Hỗ trợ kỹ thuật miễn phí trọn đời
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-blue-600 font-bold text-blue-600">
                Thông tin chi tiết
              </button>
              <button className="pb-4 border-b-2 border-transparent font-bold text-gray-600 hover:text-gray-900">
                Đánh giá (156)
              </button>
              <button className="pb-4 border-b-2 border-transparent font-bold text-gray-600 hover:text-gray-900">
                Chính sách
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {accountDetails.map((detail, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">{detail.label}</div>
                <div className="font-bold text-gray-900">{detail.value}</div>
              </div>
            ))}
          </div>

          <div className="prose max-w-none">
            <h3 className="text-xl font-black text-gray-900 mb-4">
              Mô tả sản phẩm
            </h3>
            <p className="text-gray-700 mb-4">
              Tài khoản {product.gameTitle} chất lượng cao. Được tuyển chọn kỹ
              lưỡng, đảm bảo an toàn và uy tín. Phù hợp cho những người chơi
              muốn trải nghiệm game ở mức độ cao mà không mất thời gian cày
              cuốc.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <Award size={18} className="text-blue-600 mt-1" />
                <span>Nhiều tướng/nhân vật hiếm, skin limited edition</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp size={18} className="text-blue-600 mt-1" />
                <span>Rank cao, có thể thi đấu competitive ngay lập tức</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield size={18} className="text-blue-600 mt-1" />
                <span>Bảo mật tốt, chưa từng vi phạm điều khoản</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-8">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.gameTitle}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                  {item.badge && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {item.badge}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs font-semibold text-blue-600 mb-1">
                    {item.gameTitle}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">
                    {item.description}
                  </h3>
                  <div className="text-xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
