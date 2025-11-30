import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Package,
} from "lucide-react";

const AdminProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGame, setFilterGame] = useState("all");

  const products = [
    {
      id: 1,
      name: "Liên Quân Mobile - VIP 15",
      game: "Liên Quân Mobile",
      price: "2,500,000đ",
      stock: 5,
      sold: 234,
      rating: 4.8,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100",
    },
    {
      id: 2,
      name: "Free Fire - Căn cước + Full đồ",
      game: "Free Fire",
      price: "1,800,000đ",
      stock: 12,
      sold: 189,
      rating: 4.9,
      status: "active",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100",
    },
    {
      id: 3,
      name: "PUBG Mobile - Conqueror",
      game: "PUBG Mobile",
      price: "3,200,000đ",
      stock: 0,
      sold: 156,
      rating: 4.7,
      status: "out_of_stock",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100",
    },
    {
      id: 4,
      name: "Liên Minh: Tốc Chiến - Kim Cương",
      game: "Liên Minh: Tốc Chiến",
      price: "2,100,000đ",
      stock: 8,
      sold: 201,
      rating: 4.6,
      status: "active",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=100",
    },
    {
      id: 5,
      name: "Valorant - Immortal Rank",
      game: "Valorant",
      price: "4,500,000đ",
      stock: 3,
      sold: 98,
      rating: 4.9,
      status: "active",
      image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=100",
    },
  ];

  const games = [
    "all",
    "Liên Quân Mobile",
    "Free Fire",
    "PUBG Mobile",
    "Liên Minh: Tốc Chiến",
    "Valorant",
  ];

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          Hết hàng
        </span>
      );
    }
    if (stock <= 5) {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          Sắp hết
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        Còn hàng
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="text-gray-500 mt-1">
            Quản lý tất cả sản phẩm trong cửa hàng
          </p>
        </div>
        <button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
          <Plus size={20} />
          <span>Thêm sản phẩm mới</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filter by Game */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterGame}
              onChange={(e) => setFilterGame(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {games.map((game) => (
                <option key={game} value={game}>
                  {game === "all" ? "Tất cả game" : game}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Game
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tồn kho
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Đã bán
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Đánh giá
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: #{product.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {product.game}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {product.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-semibold ${
                        product.stock === 0
                          ? "text-red-600"
                          : product.stock <= 5
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {product.sold}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-sm font-semibold text-gray-900">
                        {product.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(product.status, product.stock)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Hiển thị <span className="font-semibold">1-5</span> trong{" "}
            <span className="font-semibold">5</span> sản phẩm
          </p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Trước
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
