import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Award,
  CheckCircle,
  Heart,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { productService, type Product } from "../services/productService";
import { reviewService, type Review } from "../services/reviewService";

const formatVnd = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value
  );

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const productData = await productService.getProductById(id);
        setProduct(productData);

        const [relatedData, reviewData] = await Promise.all([
          productService.getRelatedProducts(id, 4),
          reviewService.getProductReviews(id),
        ]);

        setRelatedProducts(relatedData);
        setReviews(reviewData);
      } catch (error) {
        console.error("Failed to load product detail", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [id]);

  const images = useMemo(() => {
    if (!product) return [];
    return product.images.map((image) => image.imageUrl);
  }, [product]);

  const features = [
    { icon: Shield, text: "Bảo hành 7 ngày đổi trả", color: "text-green-600" },
    { icon: Zap, text: "Giao tài khoản ngay lập tức", color: "text-yellow-600" },
    { icon: CheckCircle, text: "Xác thực tài khoản 100%", color: "text-blue-600" },
    { icon: Users, text: "Hỗ trợ 24/7", color: "text-purple-600" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <div className="flex justify-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-24 px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Không tìm thấy sản phẩm
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold"
          >
            Quay lại danh sách sản phẩm
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const accountDetails = [
    { label: "Game", value: product.gameTitle || product.category?.name || "N/A" },
    { label: "Loại tài khoản", value: product.accountType || "Chưa cập nhật" },
    { label: "Rank", value: product.rankLevel || "Chưa cập nhật" },
    { label: "Khu vực", value: product.serverRegion || "Chưa cập nhật" },
    { label: "Tồn kho", value: String(product.stockQuantity) },
    { label: "Trạng thái", value: product.status },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <button onClick={() => navigate("/")} className="hover:text-blue-600">
            Trang chủ
          </button>
          <span>/</span>
          <button onClick={() => navigate("/products")} className="hover:text-blue-600">
            Sản phẩm
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-4 border border-gray-100">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage] || images[0]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center text-gray-400">
                  Không có ảnh sản phẩm
                </div>
              )}
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-blue-500 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img src={image} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-start justify-between mb-4 gap-4">
              <div>
                <div className="text-sm font-semibold text-blue-600 mb-2">
                  {product.gameTitle || product.category?.name || "Game Account"}
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-3">{product.name}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>{product.ratingAverage.toFixed(1)}</span>
                  </div>
                  <span>•</span>
                  <span>{product.ratingCount} đánh giá</span>
                  <span>•</span>
                  <span>Đã bán {product.soldCount}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsFavorite((prev) => !prev)}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
                    isFavorite
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-gray-200 bg-white text-gray-500"
                  }`}
                >
                  <Heart size={20} className={isFavorite ? "fill-current" : ""} />
                </button>
                <button className="w-12 h-12 rounded-xl border border-gray-200 bg-white text-gray-500 flex items-center justify-center">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-6">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
                {formatVnd(product.price)}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                    <feature.icon size={20} className={feature.color} />
                    <span className="font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => addToCart(product, 1)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart size={20} />
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    navigate("/cart");
                  }}
                  className="flex-1 bg-white border-2 border-blue-600 text-blue-600 font-bold py-4 rounded-xl"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-16">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8 overflow-x-auto">
              <button className="pb-4 border-b-2 border-blue-600 font-bold text-blue-600">
                Thông tin chi tiết
              </button>
              <button className="pb-4 border-b-2 border-transparent font-bold text-gray-600 hover:text-gray-900">
                Đánh giá ({reviews.length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {accountDetails.map((detail) => (
              <div key={detail.label} className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">{detail.label}</div>
                <div className="font-bold text-gray-900">{detail.value}</div>
              </div>
            ))}
          </div>

          <div className="prose max-w-none mb-10">
            <h3 className="text-xl font-black text-gray-900 mb-4">Mô tả sản phẩm</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <Award size={18} className="text-blue-600 mt-1" />
                <span>Tài khoản đã được chuẩn hóa dữ liệu và kiểm tra trước khi giao.</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp size={18} className="text-blue-600 mt-1" />
                <span>Phù hợp để chơi ngay mà không cần cày lại từ đầu.</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield size={18} className="text-blue-600 mt-1" />
                <span>Hỗ trợ sau bán và tư vấn đổi thông tin bảo mật.</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-black text-gray-900 mb-4">Đánh giá gần đây</h3>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2 gap-4">
                      <div>
                        <div className="font-semibold text-gray-900">{review.userName || "Khách hàng"}</div>
                        <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString("vi-VN")}</div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} className="fill-current" />
                        <span className="font-bold">{review.rating}</span>
                      </div>
                    </div>
                    {review.title && <div className="font-semibold text-gray-800 mb-1">{review.title}</div>}
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-8">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-1"
              >
                <div className="relative">
                  {item.images.length > 0 ? (
                    <img
                      src={item.images.find((image) => image.isPrimary)?.imageUrl || item.images[0].imageUrl}
                      alt={item.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                      Không có ảnh
                    </div>
                  )}
                  {item.badge && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {item.badge}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs font-semibold text-blue-600 mb-1">{item.gameTitle}</div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">{item.name}</h3>
                  <div className="text-xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {formatVnd(item.price)}
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
