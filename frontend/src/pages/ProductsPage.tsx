import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Star, ShoppingCart, Zap, Shield } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { GameAccount } from "../types";
import { FEATURED_ACCOUNTS } from "../constants";

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("all");

  // Duplicate data for more products
  const allProducts: GameAccount[] = [
    ...FEATURED_ACCOUNTS,
    ...FEATURED_ACCOUNTS.map((acc) => ({
      ...acc,
      id: acc.id + 10,
    })),
    ...FEATURED_ACCOUNTS.map((acc) => ({
      ...acc,
      id: acc.id + 20,
    })),
  ];

  const games = ["Valorant", "Genshin Impact", "Roblox", "League of Legends"];
  const priceRanges = [
    { value: "all", label: "Tất cả mức giá" },
    { value: "0-500", label: "Dưới 500K" },
    { value: "500-1000", label: "500K - 1 triệu" },
    { value: "1000-2000", label: "1 - 2 triệu" },
    { value: "2000+", label: "Trên 2 triệu" },
  ];

  const filteredProducts = allProducts.filter((product) => {
    // If no game selected and no search term, return empty
    if (!selectedGame && !searchTerm) return false;

    const matchSearch =
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.gameTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGame = !selectedGame || product.gameTitle === selectedGame;

    let matchPrice = true;
    if (priceRange !== "all") {
      const priceNum = parseInt(product.price.replace(/[^0-9]/g, ""));
      if (priceRange === "0-500") matchPrice = priceNum < 500000;
      else if (priceRange === "500-1000")
        matchPrice = priceNum >= 500000 && priceNum < 1000000;
      else if (priceRange === "1000-2000")
        matchPrice = priceNum >= 1000000 && priceNum < 2000000;
      else if (priceRange === "2000+") matchPrice = priceNum >= 2000000;
    }

    return matchSearch && matchGame && matchPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
              Kho Tài Khoản Game
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Chọn game yêu thích để xem tài khoản có sẵn
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản game..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:border-white/40 focus:ring-0 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-blue-600" />
                <h3 className="font-bold text-gray-900">Bộ lọc</h3>
              </div>

              {/* Game Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Loại game
                </label>
                <div className="space-y-2">
                  {games.map((game) => (
                    <button
                      key={game}
                      onClick={() => setSelectedGame(game)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                        selectedGame === game
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {game}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Mức giá
                </label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setPriceRange(range.value)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                        priceRange === range.value
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <Shield size={32} className="mb-3" />
              <h4 className="font-bold text-lg mb-2">Cam kết chất lượng</h4>
              <p className="text-sm text-blue-100">
                100% tài khoản thật, bảo hành đổi trả trong 7 ngày
              </p>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {!selectedGame && !searchTerm ? (
              /* Game Selection View */
              <div className="text-center py-16">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Filter size={48} className="text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-3">
                    Chọn Game Yêu Thích
                  </h2>
                  <p className="text-gray-600 text-lg max-w-md mx-auto">
                    Vui lòng chọn một game từ danh sách bên trái hoặc tìm kiếm
                    để xem tài khoản có sẵn
                  </p>
                </div>

                {/* Quick Game Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {games.map((game) => (
                    <button
                      key={game}
                      onClick={() => setSelectedGame(game)}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-2"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <ShoppingCart size={32} className="text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{game}</h3>
                      <p className="text-sm text-gray-600">
                        {allProducts.filter((p) => p.gameTitle === game).length}{" "}
                        tài khoản
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Product List View */
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    {selectedGame && (
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-black text-gray-900">
                          {selectedGame}
                        </h2>
                        <button
                          onClick={() => setSelectedGame("")}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          ← Chọn game khác
                        </button>
                      </div>
                    )}
                    <p className="text-gray-600">
                      Tìm thấy{" "}
                      <span className="font-bold text-gray-900">
                        {filteredProducts.length}
                      </span>{" "}
                      sản phẩm
                    </p>
                  </div>
                  <select className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-0 outline-none font-medium text-sm">
                    <option>Mới nhất</option>
                    <option>Giá thấp đến cao</option>
                    <option>Giá cao đến thấp</option>
                    <option>Phổ biến nhất</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer hover:-translate-y-1"
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.gameTitle}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            {product.badge}
                          </div>
                        )}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                          <Star
                            size={14}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          <span className="text-xs font-bold text-gray-900">
                            4.8
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="text-xs font-semibold text-blue-600 mb-2">
                          {product.gameTitle}
                        </div>
                        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {product.description}
                        </h3>

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              Giá bán
                            </div>
                            <div className="text-2xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                              {product.price}
                            </div>
                          </div>
                          <div className="bg-green-50 px-3 py-1 rounded-lg">
                            <div className="flex items-center gap-1 text-green-600">
                              <Zap size={14} />
                              <span className="text-xs font-bold">
                                Sẵn sàng
                              </span>
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

                {filteredProducts.length === 0 && selectedGame && (
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
              </>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
