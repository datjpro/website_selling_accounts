import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Award, CheckCircle, Heart, Share2, Shield, ShoppingCart, Star, TrendingUp, Users, Zap, ThumbsUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { productService, type Product } from "../services/productService";
import { reviewService, type Review } from "../services/reviewService";

const formatVnd = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: "", comment: "" });

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

  const images = useMemo(() => (product ? product.images.map((image) => image.imageUrl) : []), [product]);

  const features = [
    { icon: Shield, text: "Bảo hành 7 ngày đổi trả", color: "text-green-600" },
    { icon: Zap, text: "Giao tài khoản ngay lập tức", color: "text-yellow-600" },
    { icon: CheckCircle, text: "Xác thực tài khoản 100%", color: "text-blue-600" },
    { icon: Users, text: "Hỗ trợ 24/7", color: "text-purple-600" },
  ];

  const handleSubmitReview = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!product) return;
    if (!isAuthenticated || !user) {
      setReviewMessage("Vui lòng đăng nhập để gửi đánh giá.");
      return;
    }

    try {
      setReviewSubmitting(true);
      setReviewMessage(null);
      const createdReview = await reviewService.createReview({
        productId: product.id,
        rating: reviewForm.rating,
        title: reviewForm.title || undefined,
        comment: reviewForm.comment,
      });
      setReviews((prev) => [createdReview, ...prev]);
      setReviewForm({ rating: 5, title: "", comment: "" });
      setReviewMessage("Gửi đánh giá thành công.");
    } catch {
      setReviewMessage("Không thể gửi đánh giá lúc này.");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const handleHelpful = async (reviewId: number) => {
    try {
      await reviewService.markHelpful(reviewId);
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, helpfulCount: review.helpfulCount + 1 } : review
        )
      );
    } catch {
      setReviewMessage("Không thể ghi nhận đánh giá hữu ích.");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"><Navbar /><div className="flex justify-center py-32"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div><Footer /></div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-24 px-4 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Không tìm thấy sản phẩm</h2>
          <button onClick={() => navigate("/products")} className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold">Quay lại danh sách sản phẩm</button>
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
          <button onClick={() => navigate("/")} className="hover:text-blue-600">Trang chủ</button>
          <span>/</span>
          <button onClick={() => navigate("/products")} className="hover:text-blue-600">Sản phẩm</button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-4 border border-gray-100">
              {images.length > 0 ? (
                <img src={images[selectedImage] || images[0]} alt={product.name} className="w-full h-[460px] object-cover" />
              ) : (
                <div className="w-full h-[460px] bg-gray-100 flex items-center justify-center text-gray-400">Không có ảnh</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button key={image} onClick={() => setSelectedImage(index)} className={`rounded-xl overflow-hidden border-2 ${selectedImage === index ? "border-blue-600" : "border-transparent"}`}>
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="text-sm font-semibold text-blue-600 mb-3">{product.gameTitle || product.category?.name || "Game Account"}</div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1 text-yellow-500"><Star size={16} className="fill-current" /><span className="font-semibold text-gray-700">{product.ratingAverage.toFixed(1)}</span></div>
              <span>{product.ratingCount} đánh giá</span>
              <span>Đã bán {product.soldCount}</span>
            </div>
            <div className="flex items-end gap-4 mb-6">
              <div className="text-4xl font-black text-orange-600">{formatVnd(product.price)}</div>
              {product.originalPrice && product.originalPrice > product.price && <div className="text-lg text-gray-400 line-through">{formatVnd(product.originalPrice)}</div>}
            </div>
            <p className="text-gray-600 mb-8 leading-7">{product.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.text} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <Icon size={20} className={feature.color} />
                    <span className="text-sm font-semibold text-gray-700">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <button onClick={() => addToCart(product, 1)} className="flex-1 min-w-[220px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                <ShoppingCart size={18} /> Thêm vào giỏ hàng
              </button>
              <button onClick={() => setIsFavorite((prev) => !prev)} className={`px-5 py-4 rounded-xl border font-bold flex items-center gap-2 ${isFavorite ? "border-red-300 bg-red-50 text-red-600" : "border-gray-200 bg-white text-gray-600"}`}>
                <Heart size={18} className={isFavorite ? "fill-current" : ""} /> Yêu thích
              </button>
              <button className="px-5 py-4 rounded-xl border border-gray-200 bg-white text-gray-600 font-bold flex items-center gap-2">
                <Share2 size={18} /> Chia sẻ
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {accountDetails.map((detail) => (
                <div key={detail.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="text-sm text-gray-600 mb-1">{detail.label}</div>
                  <div className="font-bold text-gray-900">{detail.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-16">
          <div className="xl:col-span-2 space-y-10">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-black text-gray-900 mb-4">Mô tả sản phẩm</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2"><Award size={18} className="text-blue-600 mt-1" /><span>Tài khoản đã được chuẩn hóa dữ liệu và kiểm tra trước khi giao.</span></li>
                <li className="flex items-start gap-2"><TrendingUp size={18} className="text-blue-600 mt-1" /><span>Phù hợp để chơi ngay mà không cần cày lại từ đầu.</span></li>
                <li className="flex items-start gap-2"><Shield size={18} className="text-blue-600 mt-1" /><span>Hỗ trợ sau bán và tư vấn đổi thông tin bảo mật.</span></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900">Đánh giá gần đây</h3>
                <div className="text-sm text-gray-500">{reviews.length} đánh giá</div>
              </div>
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.slice(0, 8).map((review) => (
                    <div key={review.id} className="rounded-xl border border-gray-100 p-5 bg-gray-50">
                      <div className="flex items-center justify-between mb-3 gap-4">
                        <div>
                          <div className="font-semibold text-gray-900">{review.userName || "Khách hàng"}</div>
                          <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString("vi-VN")}</div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          {Array.from({ length: review.rating }).map((_, index) => (
                            <Star key={index} size={14} className="fill-current" />
                          ))}
                        </div>
                      </div>
                      {review.title && <div className="font-semibold text-gray-800 mb-2">{review.title}</div>}
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <button onClick={() => handleHelpful(review.id)} className="inline-flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-700">
                        <ThumbsUp size={16} /> Hữu ích ({review.helpfulCount})
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm sticky top-6">
              <h3 className="text-xl font-black text-gray-900 mb-6">Gửi đánh giá</h3>
              {!isAuthenticated ? (
                <div className="space-y-4">
                  <p className="text-gray-600">Bạn cần đăng nhập để gửi đánh giá cho sản phẩm này.</p>
                  <button onClick={() => navigate("/login")} className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">Đăng nhập</button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmitReview}>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Số sao</label>
                    <select value={reviewForm.rating} onChange={(e) => setReviewForm((prev) => ({ ...prev, rating: Number(e.target.value) }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                      {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} sao</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề</label>
                    <input type="text" value={reviewForm.title} onChange={(e) => setReviewForm((prev) => ({ ...prev, title: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Ví dụ: Tài khoản đẹp, đúng mô tả" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung đánh giá</label>
                    <textarea value={reviewForm.comment} onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg min-h-[140px]" placeholder="Chia sẻ trải nghiệm của bạn..." required />
                  </div>
                  {reviewMessage && <p className="text-sm text-blue-600">{reviewMessage}</p>}
                  <button disabled={reviewSubmitting} className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold">
                    {reviewSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-8">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} onClick={() => navigate(`/product/${item.id}`)} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-1">
                <div className="relative">
                  {item.images.length > 0 ? (
                    <img src={item.images.find((image) => image.isPrimary)?.imageUrl || item.images[0].imageUrl} alt={item.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">Không có ảnh</div>
                  )}
                  {item.badge && <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">{item.badge}</div>}
                </div>
                <div className="p-4">
                  <div className="text-xs font-semibold text-blue-600 mb-1">{item.gameTitle}</div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm">{item.name}</h3>
                  <div className="text-xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{formatVnd(item.price)}</div>
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

