import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, Filter, Star, ShoppingCart, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  categoryService,
  productService,
  type Category,
  type Product,
} from "../services/productService";

const formatVnd = (value: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value
  );

const getProductSectionLabel = (product: Product): string => {
  return product.category?.name || product.gameTitle || "Khác";
};

const getSectionDescription = (category?: Category): string => {
  if (category?.description) {
    return category.description;
  }

  return "Danh sách tài khoản được tách riêng theo từng game để bạn chọn nhanh hơn.";
};

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const priceRanges = [
    { value: "all", label: "Tất cả mức giá" },
    { value: "0-500", label: "Dưới 500K" },
    { value: "500-1000", label: "500K - 1 triệu" },
    { value: "1000-2000", label: "1 - 2 triệu" },
    { value: "2000+", label: "Trên 2 triệu" },
  ];

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);

        const categorySlug = searchParams.get("category");
        if (categorySlug) {
          const matchedCategory = data.find((category) => category.slug === categorySlug);
          if (matchedCategory) {
            setSelectedCategoryId(matchedCategory.id);
          }
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    void loadCategories();
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await productService.getProducts({
          search: searchTerm || undefined,
          categoryId: selectedCategoryId ?? undefined,
          status: "active",
          sortBy: "newest",
          sortOrder: "desc",
          limit: 60,
          page: 1,
        });
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to load products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => void loadProducts(), 250);
    return () => clearTimeout(debounce);
  }, [searchTerm, selectedCategoryId]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (priceRange === "all") return true;
      if (priceRange === "0-500") return product.price < 500000;
      if (priceRange === "500-1000") {
        return product.price >= 500000 && product.price < 1000000;
      }
      if (priceRange === "1000-2000") {
        return product.price >= 1000000 && product.price < 2000000;
      }
      if (priceRange === "2000+") return product.price >= 2000000;
      return true;
    });
  }, [products, priceRange]);

  const productSections = useMemo(() => {
    if (selectedCategoryId) {
      const selectedCategory = categories.find((category) => category.id === selectedCategoryId);
      return [
        {
          key: String(selectedCategoryId),
          title: selectedCategory?.name || "Danh mục đã chọn",
          description: getSectionDescription(selectedCategory),
          products: filteredProducts,
        },
      ];
    }

    const productGroups = new Map<
      string,
      {
        key: string;
        title: string;
        description: string;
        products: Product[];
      }
    >();

    categories.forEach((category) => {
      productGroups.set(String(category.id), {
        key: String(category.id),
        title: category.name,
        description: getSectionDescription(category),
        products: [],
      });
    });

    filteredProducts.forEach((product) => {
      const sectionKey = product.categoryId
        ? String(product.categoryId)
        : getProductSectionLabel(product);
      const existingSection = productGroups.get(sectionKey);

      if (existingSection) {
        existingSection.products.push(product);
        return;
      }

      productGroups.set(sectionKey, {
        key: sectionKey,
        title: getProductSectionLabel(product),
        description: "Các tài khoản thuộc nhóm này được hiển thị riêng, không trộn với game khác.",
        products: [product],
      });
    });

    return Array.from(productGroups.values()).filter((section) => section.products.length > 0);
  }, [categories, filteredProducts, selectedCategoryId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
              Kho Tài Khoản Game
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Mỗi loại game có khu riêng như LOL, Tốc Chiến và các game khác.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản game..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:border-white/40 focus:ring-0 outline-none transition-all"
              />
            </div>
          </div>

          {categories.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategoryId(null)}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                  selectedCategoryId === null
                    ? "bg-white text-blue-700 shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Tất cả loại game
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategoryId((previousCategoryId) =>
                      previousCategoryId === category.id ? null : category.id
                    )
                  }
                  className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                    selectedCategoryId === category.id
                      ? "bg-white text-blue-700 shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Bộ lọc</h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Khoảng giá
                </label>
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setPriceRange(range.value)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                      priceRange === range.value
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : productSections.length > 0 ? (
              <div className="space-y-10">
                {productSections.map((section) => (
                  <section key={section.key} className="space-y-5">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
                      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                          <h2 className="text-2xl font-black text-gray-900">{section.title}</h2>
                          <p className="text-gray-600 mt-1">{section.description}</p>
                        </div>
                        <div className="text-sm font-semibold text-blue-600">
                          {section.products.length} tài khoản
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {section.products.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-1"
                        >
                          <div className="relative">
                            {product.images.length > 0 ? (
                              <img
                                src={
                                  product.images.find((image) => image.isPrimary)?.imageUrl ||
                                  product.images[0].imageUrl
                                }
                                alt={product.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                                Không có ảnh
                              </div>
                            )}

                            {product.badge && (
                              <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                {product.badge}
                              </div>
                            )}

                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                              <Star size={14} className="text-yellow-500 fill-yellow-500" />
                              <span className="text-xs font-bold text-gray-900">
                                {product.ratingAverage.toFixed(1)}
                              </span>
                            </div>
                          </div>

                          <div className="p-5">
                            <div className="text-xs font-semibold text-blue-600 mb-2">
                              {product.gameTitle || product.category?.name || "Game Account"}
                            </div>

                            <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h3>

                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Giá bán</div>
                                <div className="text-2xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                  {formatVnd(product.price)}
                                </div>
                              </div>

                              <div className="bg-green-50 px-3 py-1 rounded-lg">
                                <div className="flex items-center gap-1 text-green-600">
                                  <Zap size={14} />
                                  <span className="text-xs font-bold">Sẵn sàng</span>
                                </div>
                              </div>
                            </div>

                            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg group-hover:shadow-xl">
                              <ShoppingCart size={18} />
                              Xem chi tiết
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-gray-600">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
